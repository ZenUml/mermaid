import type { DiagramDetector } from '../../diagram-api/types';

export const sequenceDetectorV2: DiagramDetector = (txt) => {
  return txt.match(/^\s*zenuml/) !== null;
};
