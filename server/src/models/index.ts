const models: Neo4jOrgChart.Neo4jModel[] = [
    {
        name: "OrgChartNode",
        schema: {
            id: {
                primary: true,
                type: "uuid",
                required: true,
            },
            name: {
                type: "string",
                unique: true,
            },
            reports_to: {
                type: "relationships",
                target: "OrgChartNode",
                relationship: "REPORTS_TO",
                direction: "out",
                properties: {
                    since: "datetime",
                },
                eager: true,
            },
            supervises: {
                type: "relationships",
                target: "OrgChartNode",
                relationship: "SUPERVISES",
                direction: "out",
                properties: {
                    since: "datetime",
                },
                eager: true,
            },
            belongs_to: {
                type: "relationships",
                target: "OrgChartNode",
                relationship: "BELONGS_TO",
                direction: "out",
                properties: {
                    since: "datetime",
                },
                eager: true,
            },
        },
    },
];

export default models;
