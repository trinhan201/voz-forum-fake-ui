import Help from '../pages/Help';
import Forums from '../pages/Forums';
import PostDetail from '../pages/PostDetail';
import Members from '../pages/Members';
import MemberDetail from '../pages/MemberDetail';
import Profile from '../pages/Profile';

const publicRoutes = [
    { path: '/', component: Forums },
    { path: '/:id', component: PostDetail },
    { path: '/profile', component: Profile },
    { path: '/members', component: Members },
    { path: '/members/:id', component: MemberDetail },
    { path: '/help', component: Help },
];

export { publicRoutes };
