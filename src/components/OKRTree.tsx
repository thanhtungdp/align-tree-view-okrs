import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider
} from 'reactflow';
import dagre from 'dagre';
import { OKRData } from '../types/okr';
import OKRNode from './OKRNode';
import SessionNode from './SessionNode';
import { RotateCcw, Move3D, ArrowUpDown, ArrowLeftRight } from 'lucide-react';

import 'reactflow/dist/style.css';

const nodeTypes = {
  okrNode: OKRNode,
  sessionNode: SessionNode,
};

interface OKRTreeProps {
  data: OKRData;
}

const OKRTree: React.FC<OKRTreeProps> = ({ data }) => {
  const [layoutDirection, setLayoutDirection] = useState<'TB' | 'LR'>('TB');
  const [viewMode, setViewMode] = useState<'year' | 'quarter'>('year');

  const getLayoutedElements = useCallback((direction: 'TB' | 'LR', mode: 'year' | 'quarter') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 360;
    const nodeHeight = 300;
    const sessionNodeWidth = 320;
    const sessionNodeHeight = 200;

    dagreGraph.setGraph({ 
      rankdir: direction,
      nodesep: 50,
      ranksep: 100,
      marginx: 20,
      marginy: 20
    });

    // Get current team and determine leadership
    const currentTeam = data.teams[data.currentTeamId];
    const isLeadership = currentTeam.leadership;
    
    // Filter objectives based on session and team rules
    const getFilteredObjectives = () => {
      if (mode === 'year') {
        // Layer 1: Active year session
        const activeSession = data.sessions[data.activeSessionId];
        
        // Layer 2: Quarter sessions
        const quarterSessions = Object.values(data.sessions).filter(
          session => session.parentSessionId === data.activeSessionId
        );
        
        // Layer 3: Main objectives based on leadership
        const mainObjectives = Object.values(data.objectives).filter(objective => {
          if (isLeadership) {
            // Leadership team: prioritize Company level objectives
            return objective.level === 'company' && objective.sessionId === data.activeSessionId;
          } else {
            // Non-leadership team: prioritize Department level objectives for current team
            return objective.level === 'department' && 
                   objective.sessionId === data.activeSessionId &&
                   objective.teamId === data.currentTeamId;
          }
        });
        
        // Layer 4: Child objectives
        const childObjectives = Object.values(data.objectives).filter(objective => {
          return mainObjectives.some(main => main.childrenIds.includes(objective.id));
        });
        
        return {
          sessions: [activeSession, ...quarterSessions],
          objectives: [...mainObjectives, ...childObjectives]
        };
      } else {
        // Quarter mode: Active quarter session as root
        const activeQuarterSession = Object.values(data.sessions).find(
          session => session.type === 'quarter' && session.isActive
        );
        
        if (!activeQuarterSession) return { sessions: [], objectives: [] };
        
        // Layer 2: Main objectives based on leadership
        const mainObjectives = Object.values(data.objectives).filter(objective => {
          if (isLeadership) {
            return objective.level === 'company' && objective.sessionId === activeQuarterSession.id;
          } else {
            return objective.level === 'department' && 
                   objective.sessionId === activeQuarterSession.id &&
                   objective.teamId === data.currentTeamId;
          }
        });
        
        // Layer 3: Child objectives
        const childObjectives = Object.values(data.objectives).filter(objective => {
          return mainObjectives.some(main => main.childrenIds.includes(objective.id));
        });
        
        return {
          sessions: [activeQuarterSession],
          objectives: [...mainObjectives, ...childObjectives]
        };
      }
    };
    
    const { sessions, objectives } = getFilteredObjectives();
    
    // Count goals for each session
    const getGoalCountForSession = (sessionId: string) => {
      return objectives.filter(obj => obj.sessionId === sessionId).length;
    };
    
    // Create session nodes
    const sessionNodes: Node[] = sessions.map((session) => ({
      id: session.id,
      type: 'sessionNode',
      data: { ...session, goalCount: getGoalCountForSession(session.id) },
      position: { x: 0, y: 0 },
    }));
    
    // Create objective nodes
    const objectiveNodes: Node[] = objectives.map((objective) => ({
      id: objective.id,
      type: 'okrNode',
      data: objective,
      position: { x: 0, y: 0 },
    }));
    
    const nodes = [...sessionNodes, ...objectiveNodes];

    // Create edges based on filtered data
    const edges: Edge[] = [];
    
    // Add session connections
    if (mode === 'year') {
      const activeSession = sessions.find(s => s.type === 'year');
      const quarterSessions = sessions.filter(s => s.type === 'quarter');
      
      quarterSessions.forEach((quarter, index) => {
        if (activeSession) {
          edges.push({
            id: `session-edge-${index}`,
            source: activeSession.id,
            target: quarter.id,
            type: 'smoothstep',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#059669',
            },
            style: {
              stroke: '#059669',
              strokeWidth: 2,
            },
          });
        }
      });
    }
    
    // Add objective connections
    data.connections.forEach((connection, index) => {
      const sourceExists = nodes.some(n => n.id === connection.from);
      const targetExists = nodes.some(n => n.id === connection.to);
      
      if (sourceExists && targetExists) {
        edges.push({
          id: `objective-edge-${index}`,
          source: connection.from,
          target: connection.to,
          type: 'smoothstep',
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#6366f1',
          },
          style: {
            stroke: '#6366f1',
            strokeWidth: 2,
          },
        });
      }
    });

    nodes.forEach((node) => {
      const width = node.type === 'sessionNode' ? sessionNodeWidth : nodeWidth;
      const height = node.type === 'sessionNode' ? sessionNodeHeight : 
                    (node.data.expanded ? 500 : nodeHeight);
      dagreGraph.setNode(node.id, { width, height });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const width = node.type === 'sessionNode' ? sessionNodeWidth : nodeWidth;
      const height = node.type === 'sessionNode' ? sessionNodeHeight : 
                    (node.data.expanded ? 500 : nodeHeight);
      
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - width / 2,
          y: nodeWithPosition.y - height / 2,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  }, [data]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => getLayoutedElements(layoutDirection, viewMode),
    [getLayoutedElements, layoutDirection, viewMode]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction: 'TB' | 'LR', mode?: 'year' | 'quarter') => {
      setLayoutDirection(direction);
      if (mode) setViewMode(mode);
      const layouted = getLayoutedElements(direction, mode || viewMode);
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
    },
    [getLayoutedElements, setNodes, setEdges, viewMode]
  );

  const onResetView = useCallback(() => {
    const layouted = getLayoutedElements(layoutDirection, viewMode);
    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
  }, [getLayoutedElements, layoutDirection, viewMode, setNodes, setEdges]);
  
  // Update layout when nodes change (for expansion)
  const onNodeChange = useCallback((changes: any[]) => {
    onNodesChange(changes);
    
    // Check if any node was expanded/collapsed
    const hasExpansionChange = changes.some(change => 
      change.type === 'replace' && 
      change.item.data && 
      typeof change.item.data.expanded !== 'undefined'
    );
    
    if (hasExpansionChange) {
      // Delay the layout update to allow the node change to complete
      setTimeout(() => {
        const layouted = getLayoutedElements(layoutDirection, viewMode);
        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);
      }, 50);
    }
  }, [onNodesChange, getLayoutedElements, layoutDirection, viewMode, setNodes, setEdges]);
  
  const currentTeam = data.teams[data.currentTeamId];

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-gray-50"
      >
        <Controls className="!bottom-8 !left-8" />
        <Background />
        
        {/* Custom Controls */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          {/* Team Info */}
          <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
            <div className="text-sm font-medium text-gray-800">{currentTeam.name}</div>
            <div className="text-xs text-gray-600">
              {currentTeam.leadership ? 'Leadership Team' : 'Department Team'}
            </div>
          </div>
          
          {/* View Mode Controls */}
          <div className="flex space-x-2">
            <button
              onClick={() => onLayout(layoutDirection, 'year')}
              className={`px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-all ${
                viewMode === 'year'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              title="Year View"
            >
              Năm
            </button>
            
            <button
              onClick={() => onLayout(layoutDirection, 'quarter')}
              className={`px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-all ${
                viewMode === 'quarter'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              title="Quarter View"
            >
              Quý
            </button>
          </div>
          
          {/* Layout Controls */}
          <div className="flex space-x-2">
            <button
              onClick={() => onLayout('TB')}
              className={`px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-all ${
                layoutDirection === 'TB'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              title="Vertical Layout"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="text-sm font-medium">Dọc</span>
            </button>
            
            <button
              onClick={() => onLayout('LR')}
              className={`px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-all ${
                layoutDirection === 'LR'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              title="Horizontal Layout"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span className="text-sm font-medium">Ngang</span>
            </button>
          </div>
          
          <button
            onClick={onResetView}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:bg-gray-50 flex items-center space-x-2 transition-all"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Reset</span>
          </button>
        </div>
      </ReactFlow>
    </div>
  );
};

const OKRTreeWithProvider: React.FC<OKRTreeProps> = (props) => (
  <ReactFlowProvider>
    <OKRTree {...props} />
  </ReactFlowProvider>
);

export default OKRTreeWithProvider;