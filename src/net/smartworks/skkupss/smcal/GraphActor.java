package net.smartworks.skkupss.smcal;

import java.util.ArrayList;
import java.util.LinkedHashSet;

//import net.smartworks.skkupss.smcal.Node;

public class GraphActor extends Graph {
    public ArrayList<Edge> EDGES = new ArrayList<Edge>();

    public void addEdge(Node node1, Node node2, String attr) {
        LinkedHashSet<Node> adjacent = this.getMap().get(node1);
        if(adjacent==null) {
            adjacent = new LinkedHashSet();
            this.getMap().put(node1, adjacent);
        }
        adjacent.add(node2); 
        addNodes(node1, node2);
        
        String[] attr_list = attr.trim().split("\\s*,\\s*");
        
        for(int i = 0; i < attr_list.length; i++){
        	Edge edge1 = new Edge(node1, node2, attr_list[i]);
            if(!(EDGES.contains(edge1))) {
            	EDGES.add(edge1);
            	}
        	}
        
        
    }
    public void addTwoWayVertex(Node node1, Node node2, String s1, String s2) {
        addEdge(node1, node2, s1);
        addEdge(node2, node1, s2);
    }
    
    
	public ArrayList<Edge> getEDGES() {
		return EDGES;
	}
	public void setEDGES(ArrayList<Edge> eDGES) {
		EDGES = eDGES;
	}
 }