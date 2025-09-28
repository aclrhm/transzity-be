const { admin } = require("../config/firebase");

class Report {
  // Create new report
  static async create(data) {
    try {
       
      await admin.firestore().collection("reports").doc(data.id_report).set(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get all reports
  static async getAll() {
    try {
      const snapshot = await admin.firestore()
        .collection("reports")
        .orderBy("created_at", "desc")
        .get();

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  }

  // Get report by ID
  static async findById(id) {
    try {
      const doc = await admin.firestore().collection("reports").doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw error;
    }
  }

  // Delete report
  static async delete(id) {
    try {
      await admin.firestore().collection("reports").doc(id).delete();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Report;
