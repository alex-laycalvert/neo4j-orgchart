import React, { ChangeEvent, useState } from "react";
import Select from "react-select";
import { createNode } from "../../requests/node";

import "./styles.scss";

interface Props {
    nodes: Neo4jOrgChart.Node[];
    relationshipTypes: string[];
    onCreateNode: (createdNode: Neo4jOrgChart.Node) => void;
}

const CreateNodeForm: React.FC<Props> = ({
    nodes,
    relationshipTypes,
    onCreateNode,
}) => {
    const [nodeProposal, setNodeProposal] =
        useState<Neo4jOrgChart.NodeProposal>(null);

    const resetForm = () => {
        setNodeProposal(null);
    };

    const submitForm = async () => {
        if (!nodeProposal?.name || nodeProposal.name.trim() === "") return;
        const response = await createNode(nodeProposal);
        onCreateNode(response.data);
        resetForm();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNodeProposal((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
        <div>
            <form className="create-node-form">
                <input
                    type="text"
                    onChange={handleInputChange}
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                />
                <div className="text-sep">
                    <i className="fa-solid fa-dash"></i>
                </div>
                <Select
                    className="relationship-select"
                    options={relationshipTypes.map((type) => ({
                        label: type,
                        value: type,
                    }))}
                    onChange={(newValue) => {
                        setNodeProposal((prev) => ({
                            ...prev,
                            relationship: newValue.value,
                        }));
                    }}
                />
                <div className="text-sep">
                    <i className="fa-solid fa-arrow-right-long"></i>
                </div>
                <Select
                    className="related-id-select"
                    options={nodes.map((node) => ({
                        label: node.name,
                        value: node.id,
                    }))}
                    onChange={(newValue) => {
                        setNodeProposal((prev) => ({
                            ...prev,
                            relatedId: newValue.value,
                        }));
                    }}
                />
                <div className="text-sep"></div>
                <button onClick={submitForm}>Create Node</button>
            </form>
        </div>
    );
};

export default CreateNodeForm;
