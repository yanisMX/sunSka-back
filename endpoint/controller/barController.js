import db from '../../models/index.js';

export const registerBar = async (req, res) => {
    const nom = req.body;

    try {
        const bar = await db.Bar.create({
            nom
        });
        res.status(201).json(bar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getBarByName = async (req, res) => {
    const nom = req.body;
    try{
        const bar = await db.Bar.findOne({ where: { nom : nom } });
        if (bar) {
            res.status(201).json(bar);
        } else {
            res.status(401).json({ error: 'Aucun produit trouver' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getBarById = async (req, res) => {
    const id = req.body;
    try{
        const bar = await db.Produit.findOne({ where: { id : id } });
        if (bar) {
            res.status(201).json(bar);
        } else {
            res.status(401).json({ error: 'Aucun produit trouver' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllBar = async (req, res) => {

    try{
        const list_bar = await db.Bar.findAll();
        if (list_bar) {
            res.status(201).json(list_bar);
        } else {
            res.status(401).json({ error: 'Aucun produit trouver' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteBar = async (req, res) => {
    const id = req.body;
    try{
        const bar_delete = await db.Bar.destroy({ where: { id : id } });
        if (bar_delete) {
            res.status(201);
        } else {
            res.status(401).json({ error: 'Aucun produit trouver' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};