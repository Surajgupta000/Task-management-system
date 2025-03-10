export async function getDashboard(req, res) {
    try {
        res.json({ message: "Your Tasks Appear Here" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}