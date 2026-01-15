import { CardContent, Typography } from '@mui/material';
import { TCard } from '../../shared/types';
import { convertUTCToLocal } from '../../shared/utils';

export function TaskCardDetails({ card }: { card: TCard }) {
  return (
    <CardContent className="cursor-grab p-4 pb-0!">
      <Typography gutterBottom variant="h6" component="h5" className="bg-gray-100">
        <div className="flex justify-center">{card.title}</div>
      </Typography>

      <Typography variant="body1" component="p">
        {card.description}
      </Typography>

      <div className="mt-2">
        <Typography variant="caption" component="p">
          Created at: {convertUTCToLocal(card.createdAt)}
        </Typography>
        <Typography variant="caption" component="p">
          Updated at: {convertUTCToLocal(card.updatedAt)}
        </Typography>
      </div>
    </CardContent>
  );
}
