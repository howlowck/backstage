/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface Config {
  /**
   * Configuration options for the catalog plugin.
   */
  catalog?: {
    /**
     * List of processor-specific options and attributes
     */
    processors?: {
      /**
       * MicrosoftGraphOrgReaderProcessor configuration
       * @deprecated Use `catalog.providers.microsoftGraphOrg` instead.
       */
      microsoftGraphOrg?: {
        /**
         * The configuration parameters for each single Microsoft Graph provider.
         */
        providers: Array<{
          /**
           * The prefix of the target that this matches on, e.g.
           * "https://graph.microsoft.com/v1.0", with no trailing slash.
           */
          target: string;
          /**
           * The auth authority used.
           *
           * Default value "https://login.microsoftonline.com"
           */
          authority?: string;
          /**
           * The tenant whose org data we are interested in.
           */
          tenantId: string;
          /**
           * The OAuth client ID to use for authenticating requests.
           */
          clientId?: string;
          /**
           * The OAuth client secret to use for authenticating requests.
           *
           * @visibility secret
           */
          clientSecret?: string;

          // TODO: Consider not making these config options and pass them in the
          // constructor instead. They are probably not environment specific, so
          // they could also be configured "in code".

          /**
           * The filter to apply to extract users.
           *
           * E.g. "accountEnabled eq true and userType eq 'member'"
           */
          userFilter?: string;
          /**
           * The filter to apply to extract groups.
           *
           * E.g. "securityEnabled eq false and mailEnabled eq true"
           */
          groupFilter?: string;
          /**
           * The fields to be fetched on query.
           *
           * E.g. ["id", "displayName", "description"]
           */
          userSelect?: string[];
          /**
           * The search criteria to apply to extract users by groups memberships.
           *
           * E.g. "\"displayName:-team\"" would only match groups which contain '-team'
           */
          groupSearch?: string;

          /**
           * The fields to be fetched on query.
           *
           * E.g. ["id", "displayName", "description"]
           */
          groupSelect?: string[];

          /**
           * The filter to apply to extract users by groups memberships.
           *
           * E.g. "displayName eq 'Backstage Users'"
           */
          userGroupMemberFilter?: string;
          /**
           * The search criteria to apply to extract groups.
           *
           * E.g. "\"displayName:-team\"" would only match groups which contain '-team'
           */
          userGroupMemberSearch?: string;
        }>;
      };
    };
    /**
     * List of provider-specific options and attributes
     */
    providers?: {
      /**
       * MicrosoftGraphOrgEntityProvider configuration.
       */
      microsoftGraphOrg?:
        | {
            /**
             * The prefix of the target that this matches on, e.g.
             * "https://graph.microsoft.com/v1.0", with no trailing slash.
             */
            target: string;
            /**
             * The auth authority used.
             *
             * Default value "https://login.microsoftonline.com"
             */
            authority?: string;
            /**
             * The tenant whose org data we are interested in.
             */
            tenantId: string;
            /**
             * The OAuth client ID to use for authenticating requests.
             */
            clientId?: string;
            /**
             * The OAuth client secret to use for authenticating requests.
             *
             * @visibility secret
             */
            clientSecret?: string;

            user?: {
              /**
               * The "expand" argument to apply to users.
               *
               * E.g. "manager".
               */
              expand?: string;
              /**
               * The filter to apply to extract users.
               *
               * E.g. "accountEnabled eq true and userType eq 'member'"
               */
              filter?: string;
            };

            group?: {
              /**
               * The "expand" argument to apply to groups.
               *
               * E.g. "member".
               */
              expand?: string;
              /**
               * The filter to apply to extract groups.
               *
               * E.g. "securityEnabled eq false and mailEnabled eq true"
               */
              filter?: string;
              /**
               * The search criteria to apply to extract users by groups memberships.
               *
               * E.g. "\"displayName:-team\"" would only match groups which contain '-team'
               */
              search?: string;
              /**
               * The fields to be fetched on query.
               *
               * E.g. ["id", "displayName", "description"]
               */
              select?: string[];
            };

            userGroupMember?: {
              /**
               * The filter to apply to extract users by groups memberships.
               *
               * E.g. "displayName eq 'Backstage Users'"
               */
              filter?: string;
              /**
               * The search criteria to apply to extract groups.
               *
               * E.g. "\"displayName:-team\"" would only match groups which contain '-team'
               */
              search?: string;
            };
          }
        | Record<
            string,
            {
              /**
               * The prefix of the target that this matches on, e.g.
               * "https://graph.microsoft.com/v1.0", with no trailing slash.
               */
              target: string;
              /**
               * The auth authority used.
               *
               * Default value "https://login.microsoftonline.com"
               */
              authority?: string;
              /**
               * The tenant whose org data we are interested in.
               */
              tenantId: string;
              /**
               * The OAuth client ID to use for authenticating requests.
               */
              clientId: string;
              /**
               * The OAuth client secret to use for authenticating requests.
               *
               * @visibility secret
               */
              clientSecret: string;

              user?: {
                /**
                 * The filter to apply to extract users.
                 *
                 * E.g. "accountEnabled eq true and userType eq 'member'"
                 */
                filter?: string;
              };

              group?: {
                /**
                 * The filter to apply to extract groups.
                 *
                 * E.g. "securityEnabled eq false and mailEnabled eq true"
                 */
                filter?: string;
                /**
                 * The search criteria to apply to extract users by groups memberships.
                 *
                 * E.g. "\"displayName:-team\"" would only match groups which contain '-team'
                 */
                search?: string;
                /**
                 * The fields to be fetched on query.
                 *
                 * E.g. ["id", "displayName", "description"]
                 */
                select?: string[];
              };

              userGroupMember?: {
                /**
                 * The filter to apply to extract users by groups memberships.
                 *
                 * E.g. "displayName eq 'Backstage Users'"
                 */
                filter?: string;
                /**
                 * The search criteria to apply to extract groups.
                 *
                 * E.g. "\"displayName:-team\"" would only match groups which contain '-team'
                 */
                search?: string;
              };
            }
          >;
    };
  };
}
