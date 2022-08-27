export {};

declare global {
    namespace Neo4jOrgChart {
        type NodeUpdateType = "PROPERTY" | "RELATIONSHIP";
        type RelationshipType = "SUPERVISES" | "BELONGS_TO";

        interface Node {
            id: string;
            name: string;
        }

        interface NodeSearch {
            id?: string;
            relatedId?: string;
            relationship?: RelationshipType;
            name?: string;
        }

        interface NodeProposal {
            name: string;
            relatedId?: string;
            relationship?: RelationshipType;
        }

        interface NodeUpdateProposal {
            id: string;
            type: NodeUpdateType;
            key?: string;
            value?: string;
            relatedId?: string;
            relationship?: RelationshipType;
        }
    }
}
