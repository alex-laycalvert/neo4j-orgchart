export {};

declare global {
    namespace Neo4jOrgChart {
        type NodeType = "OrgChartNode";
        type NodeUpdateType = "PROPERTY" | "RELATIONSHIP";
        type RelationshipType = "SUPERVISES" | "REPORTS_TO" | "BELONGS_TO";

        interface Neo4jModel {
            name: string;
            schema: Neode.SchemaObject;
        }

        interface Node {
            id: string;
            name: string;
            reports_to?: Neode.Relationship;
            supervises?: Neode.Relationship;
            belongs_to?: Neode.Relationship;
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

        interface OrgChartNode {
            data: Node;
            children: OrgChartNode[];
        }
    }
}
