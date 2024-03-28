import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { RichTextElement } from '../../components/shared/richText/RichTextElement';
import { AppPage } from '../../components/shared/ui/appPage';
import {
  getDefaultMetadata,
  getEventBySlug,
  getEventItemsWithSlugs,
  getHomepage,
} from '../../lib/services/kontentClient';
import { ValidCollectionCodename } from '../../lib/types/perCollection';
import { defaultEnvId, defaultPreviewKey, siteCodename } from '../../lib/utils/env';
import {
  Event,
  SEOMetadata,
  WSL_Page,
  WSL_WebSpotlightRoot,
  contentTypes,
} from '../../models';
import { createElementSmartLink } from '../../lib/utils/smartLinkUtils';
import { EventItem } from '../../components/listingPage/EventItem';

type Props = Readonly<{
  event: Event;
  siteCodename: ValidCollectionCodename;
  defaultMetadata: SEOMetadata;
  siteMenu?: WSL_Page | null;
  homepage?: WSL_WebSpotlightRoot;
  isPreview: boolean;
  language: string;
}>;

const EventPage: FC<Props> = (props) => {
  return (
    <AppPage
      siteCodename={props.siteCodename}
      homeContentItem={props.homepage}
      defaultMetadata={props.defaultMetadata}
      item={props.event}
      pageType='Event'
      isPreview={props.isPreview}
    >
      <div
        className='pt-10 max-w-5xl flex-col px-auto mx-auto'
        {...createElementSmartLink(
          contentTypes.event.elements.content.codename
        )}
      >
        <div className='max-w-md mx-auto mb-16'>
          <EventItem
            key={props.event.system.id}
            title={props.event.elements.title?.value}
            itemId={props.event.system.id}
            itemName={props.event.system.name}
            location={props.event.elements.eventLocation?.value}
            organizer={props.event.elements.organiser?.value}
            startDate={props.event.elements.startDateTime?.value}
            endDate={props.event.elements.endDateTime?.value}
            locale={props.event.system.language}
            detailUrl={`/events/${props.event.elements.url?.value}`}
          />
        </div>
        {props.event.elements.content && (
          <RichTextElement
            element={props.event.elements.content}
            isInsideTable={false}
            language={props.language}
          />
        )}
      </div>
    </AppPage>
  );
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  context
) => {
  const slug =
    typeof context.params?.slug === 'string' ? context.params.slug : '';

  if (!slug) {
    return { notFound: true };
  }
  
  const envId = defaultEnvId;
  const previewApiKey = defaultPreviewKey;

  const event = await getEventBySlug(
    { envId, previewApiKey },
    slug,
    !!context.preview,
    context.locale as string
  );
  const defaultMetadata = await getDefaultMetadata(
    { envId, previewApiKey },
    !!context.preview,
    context.locale as string
  );
  const homepage = await getHomepage(
    { envId, previewApiKey },
    !!context.preview,
    context.locale as string
  );

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      event,
      siteCodename,
      defaultMetadata,
      isPreview: !!context.preview,
      language: context.locale as string,
      homepage: homepage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () =>
  getEventItemsWithSlugs({ envId: defaultEnvId }).then((events) => ({
    paths: events.map((event) => ({
      params: {
        slug: event.elements.url?.value,
      },
    })),
    fallback: 'blocking',
  }));

export default EventPage;
