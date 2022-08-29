import React, { useEffect, useState } from "react";
import { getNode } from "../../requests/node";

import "./styles.scss";

interface Props {
    nodeId: string;
    onClick?: (id: string) => void;
}

const Node: React.FC<Props> = ({ nodeId, onClick }) => {
    const [node, setNode] = useState<Neo4jOrgChart.Node>({
        id: "NULL",
        name: "NULL",
    });

    const fetchNode = async () => {
        setNode((await getNode(nodeId)).data.data);
    };

    useEffect(() => {
        fetchNode();
    }, []);

    return (
        <li key={node.id}>
            <div className="orgchart-node" onClick={() => onClick(node.id)}>
                <div className="orgchart-node-body">{node.name}</div>
            </div>
            {node.reports_to && (
                <ul>
                    {node.supervises.map((child: any) => {
                        return (
                            <Node
                                key={child.node.id}
                                nodeId={child.node.id}
                                onClick={onClick}
                            />
                        );
                    })}
                </ul>
            )}
        </li>
    );
};

export default Node;
