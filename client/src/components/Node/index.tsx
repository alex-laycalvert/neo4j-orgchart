import React from "react";
import { deleteNode } from "../../requests/node";

interface Props {
    node: Neo4jOrgChart.Node;
    onDeleteNode: () => void;
}

const Node: React.FC<Props> = ({ node, onDeleteNode }) => {
    const handleDeleteNode = async () => {
        await deleteNode(node.id);
        onDeleteNode();
    };

    return (
        <div className="list-node">
            <h3>{node.name}</h3>
            <button onClick={handleDeleteNode}>Delete Node</button>
        </div>
    );
};

export default Node;
