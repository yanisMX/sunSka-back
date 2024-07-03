import db from '../../models/index.js';
import stockController from '../../endpoint/controller/stockController.js';
import userController from '../../endpoint/controller/userController.js';

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

export const getAllBar= async (req, res) => {
    try{
        const list_bar = await db.Bar.findAll();
        if (list_bar) {
            res.status(201).json(list_bar);
        } else {
            res.status(401).json({ error: 'Aucune entrée trouvée' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllBarAndNbLines = async (req, res) => {

    try{
        let list_bar = await db.Bar.findAll();
        const list_bar = await db.Bar.findAll();

        if (list_bar) {
            const barIds = list_bar.map(bar => bar.id);

            const stockCounts = await db.Stock.findAll({
                where: { idBar: barIds },
                attributes: ['idBar', [Sequelize.fn('COUNT', Sequelize.col('idBar')), 'nbProduits']],
                group: 'idBar'
            });

            const stockCountMap = stockCounts.reduce((acc, stock) => {
                acc[stock.idBar] = stock.dataValues.nbProduits;
                return acc;
            }, {});

            const result = list_bar.map(bar => ({
                id: bar.id,
                nom: bar.nom,
                nbProduits: stockCountMap[bar.id] || 0
            }));

            console.log(result);

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
        let list_stock = await db.Stock.findAll({ where: {idBar: id}});
        let list_stock_ids = list_stock.map(stock => stock.id)
        for (const stock_id of list_stock_ids){
            stockController.BackDeleteStock(stock_id)
        };

        let list_user = await db.utilisateur.findAll({ where: {idBar: id}});
        let list_user_ids = list_user.map(user => user.id)
        for (const user_id of list_user_ids){
            userController.deleteUser(user_id)
        };

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