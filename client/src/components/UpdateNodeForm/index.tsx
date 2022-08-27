import React, { ChangeEvent, useState } from "react";
import Select from "react-select";
import { updateNode } from "../../requests/node";

import "./styles.scss";

interface Props {
    nodes: Neo4jOrgChart.Node[];
    relationshipTypes: string[];
    onUpdateNode: (updatedNode: Neo4jOrgChart.Node) => void;
}

const UpdateNodeForm: React.FC<Props> = ({
    nodes,
    relationshipTypes,
    onUpdateNode,
}) => {
    const [proposal, setProposal] = useState<Neo4jOrgChart.NodeUpdateProposal>({
        id: "",
        type: "RELATIONSHIP",
    });

    const resetForm = () => {
        setProposal({
            id: "",
            type: "RELATIONSHIP",
        });
    };

    const submitForm = async () => {
        if (!proposal.relatedId || !proposal.relationship) return;
        console.log(proposal);
        const response = await updateNode(proposal);
        onUpdateNode(response.data);
        resetForm();
    };

    return (
        <div>
            <form className="update-node-form">
                <Select
                    className="select"
                    options={nodes.map((node) => ({
                        label: node.name,
                        value: node.id,
                    }))}
                    onChange={(newValue) => {
                        setProposal((prev) => ({
                            ...prev,
                            id: newValue.value,
                        }));
                    }}
                />
                <div className="text-sep"></div>
                <Select
                    className="select"
                    options={relationshipTypes.map((type) => ({
                        label: type,
                        value: type,
                    }))}
                    onChange={(newValue) => {
                        setProposal((prev) => ({
                            ...prev,
                            relationship:
                                newValue.value as Neo4jOrgChart.RelationshipType,
                        }));
                    }}
                />
                <div className="text-sep">
                    <i className="fa-solid fa-arrow-right-long"></i>
                </div>
                <Select
                    className="select"
                    options={nodes.map((node) => ({
                        label: node.name,
                        value: node.id,
                    }))}
                    onChange={(newValue) => {
                        setProposal((prev) => ({
                            ...prev,
                            relatedId: newValue.value,
                        }));
                    }}
                />
                <div className="text-sep"></div>
                <button className="button" onClick={submitForm}>
                    Update Node
                </button>
            </form>
        </div>
    );
};

export default UpdateNodeForm;
