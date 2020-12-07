import { Accessory } from "node-tradfri-client";

export interface IGenericDevice {
    name: string;
    instanceId:Number;
    type: Number;
    alive:Boolean;
    
}


export class GenericDevice implements IGenericDevice {
    
    protected accessory:Accessory;

	constructor(payload: Accessory) {
        this.accessory = payload;
	}

	get name(): string {
		return this.accessory.name;
    }
    get instanceId(): Number {
		return  this.accessory.instanceId;
    }
    get type(): Number {
		return this.accessory.type;
    }
    get alive(): Boolean {
		return this.accessory.alive;
	}
}