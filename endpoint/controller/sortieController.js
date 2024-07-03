import db from '../../models/index.js';
import stockController from '../../endpoint/controller/stockController.js';

export const registerSortie = async (req, res) => {
    const {quantite, idStock} = req.body;
    let Date = new Date().toJSON().slice(0, 10);
    try {
        const sortie = await db.Sortie.create({
            quantite,
            idStock,
            Date
        });
        res.status(201).json(sortie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSortieByStock = async (req, res) => {
    const idStock = req.body;
    try{
        const list_sortie = await db.Sortie.findAll({ where: { idStock : idStock } });
        if (list_sortie) {
            res.status(201).json(list_sortie);
        } else {
            res.status(401).json({ error: 'Aucune entrée trouvée' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getOneSortie = async (req, res) => {
    const id = req.body;
    try{
        const sortie = await db.Sortie.findOne({ where: { id : id } });
        if (sortie) {
            res.status(201).json(sortie);
        } else {
            res.status(401).json({ error: 'Aucune entrée trouvée' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteLatestSortie = async (req, res) => {

    try{
        const toDelete = await db.Sortie.findAll({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        })[0];
        await toDelete.destroy();

        stockController.updateQuantite(-1, toDelete.idStock)

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

