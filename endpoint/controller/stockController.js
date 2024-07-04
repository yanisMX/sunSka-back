import db from '../../models/index.js';
import { Sequelize, Op } from 'sequelize';

export const registerStock = async (req, res) => {
    const {idProduit, idBar, seuilAlerte} = req.body;

    try {
      const stock = await db.Stock.create({
        idProduit,
        idBar,
        quantite:0,
        seuilAlerte
      });
      res.status(201).json(stock);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getStockById = async (req, res) => {
    const id = req.body;
    try{
    const stock = await db.Stock.findOne({ where: { id : id } });
    if (stock) {
        res.status(201).json(stock);
      } else {
        res.status(401).json({ error: 'Aucune entrée trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getStockByIdBar = async (req, res) => {
    const idBar = req.body;
    try{
    const list_stock = await db.Stock.findAll({ where: { idBar : idBar } });
    if (list_stock) {
        res.status(201).json(list_stock);
      } else {
        res.status(401).json({ error: 'Aucune entrée trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getStockByIdProduit = async (req, res) => {
    const idProduit = req.body;
    try{
    const list_stock = await db.Stock.findAll({ where: { idProduit : idProduit } });
    if (list_stock) {
        res.status(201).json(list_stock);
      } else {
        res.status(401).json({ error: 'Aucune entrée trouvée' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllStock = async (req, res) => {
    try{
        const list_stock = await db.Stock.findAll();
        if (list_stock) {
            res.status(201).json(list_stock);
          } else {
            res.status(401).json({ error: 'Aucune entrée trouvée' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        }
};

export const updateQuantite = async (value, idStock) => {
    try{
        let stock = await db.Stock.findOne({ where: { id : idStock } });
        stock.quantite = stock.quantite + value
        await stock.save()
    } catch (err) {
        console.error(err);
    }
};

export const deleteStock = async (req, res) => {
    const id = req.body;
    try{
        let list_entree = await db.Entree.findAll({ where: {idStock: id}});
        let list_entree_ids = list_entree.map(entree => entree.id)
        await db.Entree.destroy({
            where: {
                id: list_entree_ids
            }
        });

        const list_sortie = await db.Sortie.findAll({ where: {idStock: id}});
        let list_sortie_ids = list_sortie.map(sortie => sortie.id)
        await db.Sortie.destroy({
            where: {
                id: list_sortie_ids
            }
        });

        let stock_delete = await db.Stock.destroy({ where: { id : id } });
        if (stock_delete) {
            res.status(201);
        } else {
            res.status(401).json({ error: 'Aucun produit trouver' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const BackDeleteStock = async (id) => {
    try{
        let list_entree = await db.Entree.findAll({ where: {idStock: id}});
        let list_entree_ids = list_entree.map(entree => entree.id)
        await db.Entree.destroy({
            where: {
                id: list_entree_ids
            }
        });

        const list_sortie = await db.Sortie.findAll({ where: {idStock: id}});
        let list_sortie_ids = list_sortie.map(sortie => sortie.id)
        await db.Sortie.destroy({
            where: {
                id: list_sortie_ids
            }
        });

        let stock_delete = await db.Stock.destroy({ where: { id : id } });

    } catch (err) {
        console.error(err);
    }
};

export const getStocksWithProducts = async (req, res) => {
    try {
        const stocks = await db.Stock.findAll({
            include: [{
                model: db.Produit,
                attributes: [['nom', 'nomProduit']]
            }],
            attributes: ['id', 'quantite', 'idBar', 'idProduit', 'seuilAlerte']
        });
        res.status(200).json(stocks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};