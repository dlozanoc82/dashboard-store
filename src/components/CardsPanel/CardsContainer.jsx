import { listOptions } from '../../helpers/OptionsSidebar';
import { Card } from './Card';

export const CardsContainer = () => {

    return (
        <div className="main-part">
            {listOptions.map((option) => option.url !== '/' && <Card key={option.id} option={option} />)}
        </div>
    )
}
