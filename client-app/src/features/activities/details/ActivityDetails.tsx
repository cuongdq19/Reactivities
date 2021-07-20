import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
    clearSelectedActivity,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
    return () => clearSelectedActivity();
  }, [clearSelectedActivity, id, loadActivity]);

  if (!activity || loadingInitial)
    return <LoadingComponent content="Loading..." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat activityId={activity.id} />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetailedSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
