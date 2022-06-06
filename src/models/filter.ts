export class FilterField{
    name: string;
    value: string;

    constructor(name: string, value: string){
        this.name = name;
        this.value = value;
    }

    contains(obj: any){
        return obj != null && obj[this.name]?.toString()?.includes(this.value);
    }
}

export class Filter{
    private collection: FilterField[] = [];

    constructor(fields?: FilterField[] | FilterField){
        if(fields)  this.addField(fields) 
    }

    setFields(fields: FilterField[]){
        this.collection = fields;
    }
    getFields(){ return this.collection }
    addField(field: FilterField | FilterField[]){
        if(!Array.isArray(field)){
            const index = this.collection?.findIndex((f) => field.name === f.name);
            if( index != -1 && !field.value) this.collection = this.collection.filter((f, i) => i != index); 
            else index != -1 ? this.collection[index] = field : this.collection.push(field);
        }else{
            field.forEach((field) => {
                const index = this.collection?.findIndex((f) => field.name === f.name);
                if( index != -1 && !field.value) this.collection = this.collection.filter((f, i) => i != index);
                else index != -1 ? this.collection[index] = field : this.collection.push(field) 
            })
        }
    }

    every<T>(obj: T){
        return this.collection.every(filt => filt.contains(obj));
    }
    
}