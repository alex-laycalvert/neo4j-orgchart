import React, { useEffect, useState } from "react";
import { getAllNodes, deleteNode } from "../../requests/node";
import CreateNodeForm from "../CreateNodeForm";
import UpdateNodeForm from "../UpdateNodeForm";
import Node from "../Node";

import "./styles.scss";

const OrgChartPage: React.FC = () => {
    const [nodes, setNodes] = useState<Neo4jOrgChart.Node[]>([]);
    const [rootNode, setRootNode] = useState<Neo4jOrgChart.Node>(null);

    const fetchNodes = async () => {
        try {
            const response = await getAllNodes();
            const nodes = response?.data?.data;
            setNodes(nodes);
        } catch (e) {
            console.error(e);
            setNodes([]);
        }
    };

    const onCreateNode = async () => {
        fetchNodes();
    };

    const onUpdateNode = async () => {
        fetchNodes();
    };

    const handleDeleteNode = async (id: string) => {
        await deleteNode(id);
    };

    useEffect(() => {
        fetchNodes();
    }, []);

    useEffect(() => {
        setRootNode(nodes.filter((node) => node.id === "0")?.[0]);
    }, [nodes]);

    return (
        <div className="container">
            <CreateNodeForm
                nodes={nodes}
                relationshipTypes={["supervises", "reports_to", "belongs_to"]}
                onCreateNode={onCreateNode}
            ></CreateNodeForm>
            <br />
            <UpdateNodeForm
                nodes={nodes}
                relationshipTypes={["supervises", "reports_to", "belongs_to"]}
                onUpdateNode={onUpdateNode}
            ></UpdateNodeForm>
            <br />
            <div className="orgchart">
                <ul>
                    {rootNode && (
                        <Node nodeId={rootNode.id} onClick={handleDeleteNode} />
                    )}
                </ul>
            </div>
        </div>
    );
};

export default OrgChartPage;
