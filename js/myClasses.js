class Item{

    static types = new Map(
        ['auto', {sps: 0.1, name: 'auto', count: 0}],
        ['guy', {sps: 0.3, name: 'guy', count: 0}]
    );

    static harvest(){
        this.types.forEach((type, data)=>score += data.sps * data.count);
    }

}