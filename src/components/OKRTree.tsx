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
import { RotateCcw, Move3D, ArrowUpDown, ArrowLeftRight } from 'lucide-react';

import 'reactflow/dist/style.css';

const nodeTypes = {
  okrNode: OKRNode,
};

interface OKRTreeProps {
  data: OKRData;
}

const OKRTree: React.FC<OKRTreeProps> = ({ data }) => {
  const [layoutDirection, setLayoutDirection] = useState<'TB' | 'LR'>('TB');

  const getLayoutedElements = useCallback((direction: 'TB' | 'LR') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 360;
    const nodeHeight = 300;

    dagreGraph.setGraph({ 
      rankdir: direction,
      nodesep: 50,
      ranksep: 100,
      marginx: 20,
      marginy: 20
    });

    const nodes: Node[] = Object.values(data.objectives).map((objective) => ({
      id: objective.id,
      type: 'okrNode',
      data: objective,
      position: { x: 0, y: 0 },
    }));

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
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  }, [data]);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => getLayoutedElements(layoutDirection),
    [getLayoutedElements, layoutDirection]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
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
    </div>
  );
};

const OKRTreeWithProvider: React.FC<OKRTreeProps> = (props) => (
  <ReactFlowProvider>
    <OKRTree {...props} />
  </ReactFlowProvider>
);

export default OKRTreeWithProvider;