import * as U from 'karet.util';
import * as L from 'partial.lenses';

const GetFilenameFormatting = (store, event) => {
  U.view(['settings',
          L.pickIn({ filenameFormatting: [] })], store).set(event);
};

export default GetFilenameFormatting;
