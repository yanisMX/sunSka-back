import db from '../../models/index.js';
import { Sequelize, Op } from 'sequelize';

export const registerEntree = async (req, res) => {
    const {quantite, idStock} = req.body;
    let Date = new Date().toJSON().slice(0, 10);
    const status = "Transmise"
    try {
      const entree = await db.Entree.create({
        quantite,
        idStock,
        Date,
        status
      });
      res.status(201).json(entree);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getEntreeByStock = async (req, res) => {
    const idStock = req.body;
    try{
    const list_entree = await db.Entree.findAll({ where: { idStock : idStock } });
    if (list_entree) {
        res.status(201).json(list_entree);
      } else {
        res.status(401).json({ error: 'Aucune entrée trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const changeStatus = async (req, res) => {
    const {id, status} = req.body;
    try{
        const entree = await db.Entree.findOne({ where: { id : id } });
        if (entree) {
            entree.status = status;
            await entree.save();
            if (status==="Validé"){
                stockController.updateQuantite(entree.quantite, entree.idStock)
            }
            res.status(201);
          } else {
            res.status(401).json({ error: 'Aucune entrée trouvée' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }
};

export const getOneEntree = async (req, res) => {
    const id = req.body;
    try{
        const entree = await db.Entree.findOne({ where: { id : id } });
        if (entree) {
            res.status(201).json(entree);
          } else {
            res.status(401).json({ error: 'Aucune entrée trouvée' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }
};

export const countUrgentEntree = async (idBar) => {
    try {
        const list_stock = await db.Stock.findAll({
            where: { idBar: idBar },
            attributes: ['id']
        });
        const stockIds = list_stock.map(stock => stock.id);
        if (stockIds.length === 0) {
            return 0;
        }
        const entreeCounts = await db.Entree.findAll({
            where: {
                idStock: stockIds,
                status: "Transmise"
            },
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('idStock')), 'nbAlertes']]
        });
        if (entreeCounts.length === 0) {
            return 0;
        }
        return entreeCounts[0].dataValues.nbAlertes;
    } catch (err) {
        console.error(err);
    }
};

export const getAllEntreeFullInfo = async (req, res) => {
    try{
        const entrees = await db.Entree.findAll({
            include: [{
                model: db.Stock,
                include: [{
                    model: db.Bar,
                    attributes: [['nom', 'nomBar']]
                }, {
                    model: db.Produit,
                    attributes: [['nom', 'nomProduit']]
                }],
                attributes: []
            }],
            attributes: ['id', 'status']
        });

        res.status(201).json(entrees);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getLatestEntreeByProduct = async (req, res) => {
        const { idBar } = req.body;
        try {
            const latestEntriesSubQuery = db.Entree.findAll({
                attributes: [
                    'idStock',
                    [Sequelize.fn('MAX', Sequelize.col('date')), 'maxDate']
                ],
                include: [{
                    model: db.Stock,
                    where: { idBar },
                    attributes: []
                }],
                group: ['idStock'],
                raw: true,
                subQuery: false
            });

            const entrees = await db.Entree.findAll({
                include: [{
                    model: db.Stock,
                    where: { idBar },
                    include: [{
                        model: db.Bar,
                        attributes: [['nom', 'nomBar']]
                    }, {
                        model: db.Produit,
                        attributes: [['nom', 'nomProduit']]
                    }],
                    attributes: []
                }],
                where: {
                    [Op.and]: Sequelize.literal(`(idStock, createdAt) IN (SELECT idStock, MAX(date) FROM Entrees INNER JOIN Stocks ON Entrees.idStock = Stocks.id WHERE Stocks.idBar = ${idBar} GROUP BY idStock)`)
                },
                attributes: ['id', 'status', 'idStock', 'createdAt']
            });

        res.status(201).json(entrees);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};