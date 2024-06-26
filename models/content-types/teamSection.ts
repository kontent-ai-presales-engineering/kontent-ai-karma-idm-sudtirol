import { type IContentItem, type Elements } from '@kontent-ai/delivery-sdk';
import { type Person } from './person';

/**
 * Generated by '@kontent-ai/model-generator@6.5.1'
 *
 * Team Section
 * Id: 37ddba68-e74e-4086-85ff-c96b03f20b47
 * Codename: team_section
 */
export type TeamSection = IContentItem<{
    /**
     * Description (rich_text)
     * Required: false
     * Id: 5778afcd-4218-4c7e-82e2-2b0e3a1d929c
     * Codename: description
     */
    description: Elements.RichTextElement;

    /**
     * Team members (modular_content)
     * Required: false
     * Id: 7649fa43-96db-43be-8ccd-38613d41aab5
     * Codename: team_members
     */
    teamMembers: Elements.LinkedItemsElement<Person>;

    /**
     * Title (text)
     * Required: true
     * Id: 9a6ab5ae-9503-4c11-bc82-1add3692a978
     * Codename: title
     */
    title: Elements.TextElement;
}>;
