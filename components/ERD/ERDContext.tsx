'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ERDNode {
  id: string;
  type: 'entity' | 'attribute' | 'relationship';
  name: string;
  x: number;
  y: number;
  properties?: Record<string, any>;
}

export interface ERDConnection {
  id: string;
  from: string;
  to: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  label?: string;
}

interface ERDContextType {
  nodes: ERDNode[];
  connections: ERDConnection[];
  selectedNodeId: string | null;
  
  // Node operations
  addNode: (node: Omit<ERDNode, 'id'>) => void;
  updateNode: (id: string, updates: Partial<ERDNode>) => void;
  deleteNode: (id: string) => void;
  selectNode: (id: string | null) => void;
  
  // Connection operations
  addConnection: (connection: Omit<ERDConnection, 'id'>) => void;
  deleteConnection: (id: string) => void;
  
  // Diagram operations
  clearDiagram: () => void;
  exportDiagram: () => string;
  importDiagram: (data: string) => void;
}

const ERDContext = createContext<ERDContextType | undefined>(undefined);

export const useERD = () => {
  const context = useContext(ERDContext);
  if (context === undefined) {
    throw new Error('useERD must be used within an ERDProvider');
  }
  return context;
};

interface ERDProviderProps {
  children: React.ReactNode;
}

export const ERDProvider: React.FC<ERDProviderProps> = ({ children }) => {
  const [nodes, setNodes] = useState<ERDNode[]>([]);
  const [connections, setConnections] = useState<ERDConnection[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const addNode = useCallback((node: Omit<ERDNode, 'id'>) => {
    const id = `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setNodes(prev => [...prev, { ...node, id }]);
  }, []);

  const updateNode = useCallback((id: string, updates: Partial<ERDNode>) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, ...updates } : node
    ));
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setConnections(prev => prev.filter(conn => 
      conn.from !== id && conn.to !== id
    ));
    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    }
  }, [selectedNodeId]);

  const selectNode = useCallback((id: string | null) => {
    setSelectedNodeId(id);
  }, []);

  const addConnection = useCallback((connection: Omit<ERDConnection, 'id'>) => {
    const id = `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setConnections(prev => [...prev, { ...connection, id }]);
  }, []);

  const deleteConnection = useCallback((id: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== id));
  }, []);

  const clearDiagram = useCallback(() => {
    setNodes([]);
    setConnections([]);
    setSelectedNodeId(null);
  }, []);

  const exportDiagram = useCallback(() => {
    return JSON.stringify({ nodes, connections }, null, 2);
  }, [nodes, connections]);

  const importDiagram = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data);
      setNodes(parsed.nodes || []);
      setConnections(parsed.connections || []);
      setSelectedNodeId(null);
    } catch (error) {
      console.error('Failed to import diagram:', error);
    }
  }, []);

  const value: ERDContextType = {
    nodes,
    connections,
    selectedNodeId,
    addNode,
    updateNode,
    deleteNode,
    selectNode,
    addConnection,
    deleteConnection,
    clearDiagram,
    exportDiagram,
    importDiagram
  };

  return (
    <ERDContext.Provider value={value}>
      {children}
    </ERDContext.Provider>
  );
};
