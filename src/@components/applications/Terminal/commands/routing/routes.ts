import hello, { match as matchHello } from '../hello';
import clear, { match as matchClear } from '../clear';
import ls, { match as matchLs } from '../ls';
import commandNotFound, { match as notFound } from '../commandNotFound';
import generateRoutes from './generateRoutes';

export default generateRoutes([
    {
        name: 'hello',
        command: hello,
        match: matchHello
    },
    {
        name: 'ls',
        command: ls,
        match: matchLs
    },
    {
        name: 'clear',
        command: clear,
        match: matchClear
    },
    {
        name: 'notFound',
        command: commandNotFound,
        match: notFound
    }
]);