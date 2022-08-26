export {};

declare global {
    namespace Neo4jOrgChart {
        interface User {
            id: string;
            firstName: string;
            lastName: string;
            occupation: string;
        }

        interface UserProposal {
            firstName: string;
            lastName: string;
            occupation: string;
        }
    }
}
