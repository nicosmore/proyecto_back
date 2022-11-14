const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const dbConfig = require('../../db/db.config');

 admin.initializeApp({
      credential: admin.credential.cert(dbConfig.firebase.credentials)
    })

class FirebaseContainer {

  constructor(collection) {
    //FirebaseContainer.connect();
    const db = getFirestore();
    this.query = db.collection(collection);
  }

/*   static connect() {
   
  } 
 */
  async getAll() {
    const docRef = this.query.get();
    const documents = docRef.docs;
    return documents.map(document => {
      return {
        id: document.id,
        ...document.data()
      }
    })
  }

  async getById(id) {
    const docRef = this.query.doc(id);
    if (!docRef) {
      const message = `Resource with id ${id} does not exist`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const document = await docRef.get();
    return document.data();
  }

  async save(item) {
    const docRef = this.query.doc();
    return await docRef.set(item);
  }

  async update(id, item) {
    const docRef = this.query.doc(id);
    if (!docRef) {
      const message = `Resource with id ${id} does not exist`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return await docRef.update(item);
  }

  async delete(id) {
    const docRef = this.query.doc(id);
    return await docRef.delete();
  }
}

module.exports = FirebaseContainer;