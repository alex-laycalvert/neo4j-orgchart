export {};

declare global {
    namespace Neo4jOrgChart {
        type NodeType = "User" | "Group";
        type RelationshipType = "SUPERVISES" | "BELONGS_TO";

        interface Node {
            id: string;
        }

        interface User extends Node {
            firstName: string;
            lastName: string;
            occupation: string;
        }

        interface Group extends Node {
            name: string;
        }

        interface NodeProposal {
            type: NodeType;
            data: any;
        }

        interface NodeUpdateProposal {
            id: string;
            key: string;
            value: string;
        }

        interface NodeRelationshipProposal {
            id: string;
            relatedId: string;
            relationship: string;
        }
    }
}
