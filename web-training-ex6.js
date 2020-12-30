const fs = require('fs');
const { noop } = require('lodash');
const _ = require('lodash');

console.log('Hey Sharon')

let ow;

fs.readFile('./ow.json', (err, data) => {
    ow = JSON.parse(data.toString());

    //zip with version
    //let getHeroes = () => _.zipWith(ow.names, ow.roles, (a, b) => { return { "name": a, role: b } }) 

    //vanilla js version
    let getHeroes = () => {
        let ans = [];
        for (let i = 0; i < ow.names.length; i++)
            ans.push({ name: ow.names[i], role: ow.roles[i], hp: ow.hp[i] })
        return ans;
    };

    console.log(getHeroes());

    let groupBy = (heroes, soryBy = 'role') => {
        let ans = {};
        heroes.forEach(e => e[soryBy] in ans ? ans[e[soryBy]].push(e) : ans[e[soryBy]] = [e]);
        return ans;
    };

    console.log(groupBy(getHeroes()));
    console.log(groupBy(getHeroes(), 'name'));
    console.log(groupBy(getHeroes(), 'hp'));

    let getByRoles = (heroes, ...roles) => {
        let ans = [];
        roles.forEach(e => groupBy(heroes)[e] ? ans.push(...groupBy(heroes)[e]) : noop);
        return ans;
    };

    console.log(getByRoles(getHeroes()))
    console.log(getByRoles(getHeroes(), 'Support'))
    console.log(getByRoles(getHeroes(), 'Support', 'Offense'))

    let makeHeroesNice = (heroes) =>  heroes.map(hero =>{ return {...hero, sayHello: () => console.log(`Hi! My name is ${hero.name}`)}});

    let niceHeroes = makeHeroesNice(getHeroes());
    niceHeroes[0].sayHello();
    niceHeroes[1].sayHello();
    niceHeroes[5].sayHello();
});






