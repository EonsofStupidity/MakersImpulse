import type { ContentRevision } from './queries';
import type { RevisionRecord, RevisionContent, RevisionMetadata, RevisionAuthor, RevisionType, RevisionStatus } from './base';

/**
 * Transforms a database revision record into a domain revision record
 */
export const transformDatabaseToDomain = (dbRevision: ContentRevision): RevisionRecord => {
  // Parse the content from JSON
  const content = dbRevision.content as {
    body: string;
    title: string;
    type: RevisionType;
    status: RevisionStatus;
  };

  // Parse the metadata from JSON
  const metadata = dbRevision.metadata as {
    rollback?: {
      fromVersion: number;
      timestamp: string;
    };
    publishStatus?: string;
    scheduledPublish?: string;
  } | null;

  // Create the revision content
  const revisionContent: RevisionContent = {
    body: content.body || '',
    title: content.title || '',
    type: content.type || 'page',
    status: content.status || 'draft'
  };

  // Create the revision metadata
  const revisionMetadata: RevisionMetadata = {
    rollback: metadata?.rollback,
    publishStatus: metadata?.publishStatus,
    scheduledPublish: metadata?.scheduledPublish
  };

  // Create the revision author
  const revisionAuthor: RevisionAuthor = {
    id: dbRevision.created_by || '',
    displayName: dbRevision.profiles?.display_name || 'Unknown'
  };

  // Return the complete domain revision record
  return {
    id: dbRevision.id,
    version: dbRevision.version_number,
    content: revisionContent,
    metadata: revisionMetadata,
    author: revisionAuthor,
    timestamp: dbRevision.created_at,
    summary: dbRevision.change_summary
  };
};

/**
 * Transforms a domain revision record back to a database revision record
 */
export const transformDomainToDatabase = (
  domainRevision: RevisionRecord,
  contentId: string
): Omit<ContentRevision, 'id' | 'created_at' | 'profiles'> => {
  // Transform the content and metadata to JSON
  const content = {
    body: domainRevision.content.body,
    title: domainRevision.content.title,
    type: domainRevision.content.type,
    status: domainRevision.content.status
  };

  const metadata = {
    rollback: domainRevision.metadata.rollback,
    publishStatus: domainRevision.metadata.publishStatus,
    scheduledPublish: domainRevision.metadata.scheduledPublish
  };

  // Return the database revision format
  return {
    content_id: contentId,
    content,
    metadata,
    created_by: domainRevision.author.id,
    version_number: domainRevision.version,
    change_summary: domainRevision.summary
  };
};

/**
 * Transforms an array of database revisions into domain revisions
 */
export const transformRevisionList = (dbRevisions: ContentRevision[]): RevisionRecord[] => {
  return dbRevisions.map(transformDatabaseToDomain);
};

/**
 * Validates a revision record's content structure
 */
export const isValidRevisionContent = (content: unknown): content is RevisionContent => {
  if (!content || typeof content !== 'object') return false;
  
  const c = content as Partial<RevisionContent>;
  return (
    typeof c.body === 'string' &&
    typeof c.title === 'string' &&
    typeof c.type === 'string' &&
    typeof c.status === 'string'
  );
};