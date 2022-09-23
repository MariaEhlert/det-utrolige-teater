import { Layout } from '../Helpers/Layout/Layout';
import './MySite.scss';
import { UserCommentList } from './UserComment';
import { UserFavoriteList } from './UserFarvoriteList';
import { UserReservationList } from './UserReservationList';
export const MySite = () => {
    return(
        <Layout title='Min side' description='Min side'>
            <h1>Min side</h1>
            <UserReservationList/>
            <UserFavoriteList/>
            <UserCommentList/>
        </Layout>
    )
}