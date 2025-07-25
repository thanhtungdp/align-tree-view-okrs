import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  Position
} from 'reactflow';
import dagre from 'dagre';
import { QuarterlyOKRData } from '../types/okr';
import OKRNode from './OKRNode';
import AddNodeModal from './AddNodeModal';
import { RotateCcw, Move3D, ArrowUpDown, ArrowLeftRight } from 'lucide-react';
import { OKRObjective } from '../types/okr';

import 'reactflow/dist/style.css';

const nodeTypes = {
  okrNode: OKRNode,
};

interface OKRTreeProps {
  data: QuarterlyOKRData;
  onDataChange?: (newData: QuarterlyOKRData) => void;
}

const OKRTree: React.FC<OKRTreeProps> = ({ data, onDataChange }) => {
  const [layoutDirection, setLayoutDirection] = useState<'TB' | 'LR'>('TB');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedParentNode, setSelectedParentNode] = useState<OKRObjective | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const getLayoutedElements = useCallback((direction: 'TB' | 'LR') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 360;
    const baseNodeHeight = 300;
    const expandedNodeHeight = 500;

    dagreGraph.setGraph({ 
      rankdir: direction,
      nodesep: direction === 'LR' ? 80 : 50,
      ranksep: direction === 'LR' ? 150 : 100,
      marginx: 20,
      marginy: 20
    });

    const nodes: Node[] = Object.values(data.objectives).map((objective) => {
      const isExpanded = expandedNodes.has(objective.id);
      const nodeHeight = isExpanded ? expandedNodeHeight : baseNodeHeight;
      
      return {
        id: objective.id,
        type: 'okrNode',
        data: objective,
        position: { x: 0, y: 0 },
      };
    });

    const edges: Edge[] = data.connections.map((connection, index) => ({
      id: `edge-${index}`,
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
    }));

    nodes.forEach((node) => {
      const isExpanded = expandedNodes.has(node.id);
      const nodeHeight = isExpanded ? expandedNodeHeight : baseNodeHeight;
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const isExpanded = expandedNodes.has(node.id);
      const nodeHeight = isExpanded ? expandedNodeHeight : baseNodeHeight;
      
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  }, [data, expandedNodes]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => getLayoutedElements(layoutDirection),
    [getLayoutedElements, layoutDirection, data]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when data changes
  React.useEffect(() => {
    const layouted = getLayoutedElements(layoutDirection);
    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
  }, [data, layoutDirection, getLayoutedElements, setNodes, setEdges]);

  const handleAddChild = useCallback((parentId: string) => {
    const parentNode = data.objectives[parentId];
    if (parentNode) {
      setSelectedParentNode(parentNode);
      setShowAddModal(true);
    }
  }, [data.objectives]);

  const handleAddNode = useCallback((newObjective: Omit<OKRObjective, 'id' | 'childrenIds'>) => {
    if (!selectedParentNode || !onDataChange) return;

    const newId = `${newObjective.level}-${Date.now()}`;
    const newOKRObjective: OKRObjective = {
      ...newObjective,
      id: newId,
      childrenIds: []
    };

    // Update data
    const updatedObjectives = {
      ...data.objectives,
      [newId]: newOKRObjective,
      [selectedParentNode.id]: {
        ...selectedParentNode,
        childrenIds: [...selectedParentNode.childrenIds, newId]
      }
    };

    const newConnection = { from: selectedParentNode.id, to: newId };
    const updatedConnections = [...data.connections, newConnection];

    const newData: OKRData = {
      objectives: updatedObjectives,
      connections: updatedConnections
    };

    onDataChange(newData);
    setShowAddModal(false);
    setSelectedParentNode(null);
  }, [selectedParentNode, data, onDataChange]);

  const onLayout = useCallback(
    (direction: 'TB' | 'LR') => {
      setLayoutDirection(direction);
      const layouted = getLayoutedElements(direction);
      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
    },
    [getLayoutedElements, setNodes, setEdges]
  );

  const onResetView = useCallback(() => {
    setExpandedNodes(new Set());
    const layouted = getLayoutedElements(layoutDirection);
    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
  }, [layoutDirection, getLayoutedElements, setNodes, setEdges]);

  const handleNodeExpansion = useCallback((nodeId: string, isExpanded: boolean) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (isExpanded) {
      newExpandedNodes.add(nodeId);
    } else {
      newExpandedNodes.delete(nodeId);
    }
    setExpandedNodes(newExpandedNodes);

    // Trigger re-layout
    const layouted = getLayoutedElements(layoutDirection);
    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
  }, [expandedNodes, layoutDirection, getLayoutedElements, setNodes, setEdges]);

  // Update nodes with onAddChild callback
  const nodesWithCallbacks = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        layoutDirection,
        onAddChild: handleAddChild,
        onExpansionChange: handleNodeExpansion
      }
    }));
  }, [nodes, layoutDirection, handleAddChild, handleNodeExpansion]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodesWithCallbacks}
        edges={edges}
        onNodesChange={onNodesChange}
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
      
      {/* Add Node Modal */}
      {selectedParentNode && (
        <AddNodeModal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            setSelectedParentNode(null);
          }}
          onAdd={handleAddNode}
          parentNode={selectedParentNode}
        />
      )}
    </div>
  );
};

const OKRTreeWithProvider: React.FC<OKRTreeProps> = (props) => (
  <ReactFlowProvider>
    <OKRTree {...props} />
  </ReactFlowProvider>
);

export default OKRTreeWithProvider;