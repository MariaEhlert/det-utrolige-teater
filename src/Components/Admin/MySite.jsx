import { Layout } from '../Helpers/Layout/Layout';
import './MySite.scss';
import { UserFavoriteList } from './UserFarvoriteList';
export const MySite = () => {
    return(
        <Layout title='Min side' description='Min side'>
            <h1>Min side</h1>
            <UserFavoriteList/>
        </Layout>
    )
}