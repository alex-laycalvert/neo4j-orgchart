import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import CreateNodeForm from "../CreateNodeForm";
import Node from "../Node";
import { getAllNodes } from "../../requests/node";

import "./styles.scss";

const OrgChartPage: React.FC = () => {
    const [nodes, setNodes] = useState<Neo4jOrgChart.Node[]>([]);

    const fetchNodes = async () => {
        try {
            const response = await getAllNodes();
            const nodes = response.data;
            setNodes(nodes);
        } catch (e) {
            console.error(e);
            setNodes([]);
        }
    };

    const onDeleteNode = () => {
        fetchNodes();
    };

    const onCreateNode = () => {
        fetchNodes();
    };

    useEffect(() => {
        fetchNodes();
    }, []);

    return (
        <div className="container">
            <CreateNodeForm
                nodes={nodes}
                relationshipTypes={["SUPERVISES", "BELONGS_TO"]}
                onCreateNode={onCreateNode}
            ></CreateNodeForm>
            {nodes.map((node) => {
                return (
                    <Node
                        key={node.id}
                        node={node}
                        onDeleteNode={onDeleteNode}
                    />
                );
            })}
        </div>
    );
};

export default OrgChartPage;
