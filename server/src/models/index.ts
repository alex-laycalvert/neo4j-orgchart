import Neode from "neode";
interface Model {
    name: string;
    schema: Neode.SchemaObject;
}

const models: Model[] = [
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
            relationship: {
                type: "relationship",
                target: "OrgChartNode",
                relationship: "SUPERVISES",
                direction: "out",
                properties: {
                    name: "string",
                },
                eager: true,
            },
        },
    },
];

export default models;
