import { Layout } from '../Helpers/Layout/Layout';
import { Login } from '../Sites/Login/Login';
import './MySite.scss';
import { UserCommentList } from './UserComment';
import { UserFavoriteList } from './UserFarvoriteList';
export const MySite = () => {
    return(
        <Layout title='Min side' description='Min side'>
            <h1>Min side</h1>
            <UserFavoriteList/>
            <UserCommentList/>
        </Layout>
    )
}