import React, { FC } from 'react';
import {
  createElementSmartLink,
  createFixedAddSmartLink,
  createItemSmartLink,
} from '../../lib/utils/smartLinkUtils';
import { TeamSection, contentTypes } from '../../models';
import { RichTextElement } from './richText/RichTextElement';

type Props = Readonly<{
  item: TeamSection;
}>;

export const TeamSectionComponent: FC<Props> = (props) => {
  return (
    <div className="bg-white py-24 sm:py-32"
      {...createItemSmartLink(
        props.item.system.id,
        props.item.system.name
      )}>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            {...createElementSmartLink(contentTypes.team_section.elements.title.codename)}>{props.item.elements.title.value}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600"
            {...createElementSmartLink(contentTypes.team_section.elements.description.codename)}>
            <RichTextElement
              element={props.item.elements.description}
              isInsideTable={false}
              language={props.item.system.language}
            /></p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 list-none"
          {...createElementSmartLink(
            contentTypes.team_section.elements.team_members.codename
          )}
          {...createFixedAddSmartLink('end')}>
          {props.item.elements.teamMembers.linkedItems ? props.item.elements.teamMembers.linkedItems?.map((teamMember) => (
            <li
              key={teamMember.system.id}
              {...createItemSmartLink(
                teamMember.system.id,
                teamMember.system.name
              )}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={teamMember.elements.photograph.value[0]?.url} alt={teamMember.elements.photograph.value[0]?.description} />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{teamMember.elements.firstName?.value} {teamMember.elements.lastName?.value}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{teamMember.elements.occupation?.value}</p>
                </div>
              </div>
            </li>
          )) : ""}
        </ul>
      </div>
    </div>
  );
};
