export declare class Profit {
    date: Date;
    description: string;
    amount: number;
}
export declare const ProfitSchema: import("mongoose").Schema<Profit, import("mongoose").Model<Profit, any, any, any, any, any, Profit>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Profit, import("mongoose").Document<unknown, {}, Profit, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Profit & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    date?: import("mongoose").SchemaDefinitionProperty<Date, Profit, import("mongoose").Document<unknown, {}, Profit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Profit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Profit, import("mongoose").Document<unknown, {}, Profit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Profit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    amount?: import("mongoose").SchemaDefinitionProperty<number, Profit, import("mongoose").Document<unknown, {}, Profit, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Profit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Profit>;
