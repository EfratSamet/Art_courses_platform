import Admin from '../models/admin.js';

// פונקציה להוספת מנהל חדש  
export const createAdmin = async (req, res) => {
    const { username, password } = req.body;
    const newAdmin = new Admin({ username, password });
    try {
        await newAdmin.save();
        res.send('Admin created successfully');
    } catch (err) {
        res.status(400).send('Error creating admin');
    }
};

// פונקציה לעדכון פרטי מנהל  
export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        await Admin.findByIdAndUpdate(id, { username, password });
        res.send('Admin details updated successfully');
    } catch (err) {
        res.status(400).send('Error updating admin details');
    }
};

// פונקציה למחיקת מנהל  
export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        await Admin.findByIdAndDelete(id);
        res.send('Admin deleted successfully');
    } catch (err) {
        res.status(400).send('Error deleting admin');
    }
};

export const getAdminDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id);
        
        if (!admin) {
            return res.status(404).send('Admin not found');
        }
        
        res.json(admin);
    } catch (err) {
        res.status(400).send('Error getting admin details');
    }
};
// module.exports = {
//     createAdmin,  
//     updateAdmin,
//     deleteAdmin  
// };