export const randomGen = (len: number): string =>  {
    let options = 'abcdefghijkklmnopqrstuvwxyz1234567890';
    let ans = "";
    let length = options.length;
    for(let i = 0; i < len; i++){
        ans += options[Math.floor(Math.random()*length)];
    }
    return ans;
}