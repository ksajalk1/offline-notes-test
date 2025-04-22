// Remove JSON DB imports
// import { readDb, writeDb } from '../../utils/jsonDb';
import { getPusherServer } from '../../utils/pusher';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { id } = req.query; // ID of the note to edit (likely localId stored as _id by client)
      const { title: noteTitle } = req.body; // New title

      if (!id || typeof noteTitle !== 'string') {
        return res.status(400).json({ error: 'Missing note ID or title' });
      }

      // TODO: Implement logic to update the note in your chosen data store.
      // - Connect to the database/data source.
      // - Find the note by its unique identifier (`id`).
      // - Update the note's title to `noteTitle`.
      // - Handle the case where the note is not found.
      // - Replace the example response below.

      const noteFound = true; // Placeholder
      const updatedNoteData = { _id: id, title: noteTitle }; // Example data for Pusher

      if (noteFound) {
        // TODO: Trigger Pusher event after successful update (optional).
        const pusherServer = getPusherServer();
        await pusherServer.trigger('notes2', 'note-updated', updatedNoteData);

        res.status(200).json({ message: 'Note edited successfully' });
      } else {
        res.status(404).json({ error: 'Note not found' });
      }
    } catch (error) {
      console.error('Error editing note:', error);
      res.status(500).json({ error: 'Failed to edit note' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}