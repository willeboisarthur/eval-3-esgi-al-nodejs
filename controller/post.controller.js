const Post = require("./../model/post.model.js");
const Emotion = require("./../model/emotion.model.js");

exports.getAll = async (req, res, next) => {
    let postList = await Post.findAll();
    res.status(200).json(postList);
}

exports.getOne = async (req, res, next) => {
    let post = await Post.findOne({ where: { id: req.params.id } });
    if(!post) {
        return res.status(404).json({ message: "Post non trouvé" });
    }
    res.status(200).json(post);
}

exports.Create = async (req, res, next) => {
    let post = await Post.create({
            authorId: req.token.id,
            content: req.body.content,
            image: req.body.image,
    });
    res.status(201).json(post);
}

exports.Update = async (req, res, next) => {
    let post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
    }
    if (post.authorId !== req.token.id) {
        return res.status(403).json({ message: "Non autorisé" });
    }

    await Post.update({
        content: req.body.content,
        image: req.body.image,
        updatedAt: new Date()
    }, {where: { id: req.params.id }}
    );
    let updatedPost = await Post.findOne({ where: { id: req.params.id } });
    res.status(200).json(updatedPost)
}

exports.Delete = async (req, res, next) => {
    let post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
    }
    if (post.authorId !== req.token.id) {
        return res.status(403).json({ message: "Non autorisé" });
    }
    await Post.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Post supprimé" });
}

exports.Addemotion = async (req, res, next) => {
    const { type } = req.body;
    const existing = await Emotion.findOne({where: 
        {
            userId: req.token.id,
            postId: req.params.id
        }
    });
    if (existing) {
        return res.status(400).json({ message: "Vous avez déjà réagi à ce post." });
    }
    await Emotion.create({
        userId: req.token.id,
        postId: req.params.id,
        type
    });
    res.status(201).json({ message: "Émotion ajoutée" });
}

exports.DeleteEmotion = async (req, res, next) => {
    await Emotion.destroy({
        where: {
            userId: req.token.id, 
            postId: req.params.id
        }
    });
    res.status(200).json({ message: "Émotion supprimée" });
}