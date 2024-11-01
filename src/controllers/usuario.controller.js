import UsuarioModel from "../model/usuario.model.js";

export default class UsuarioController {
    async criar(req, res) {
        let { nome, email, idade } = req.body;

        if (nome && email && idade) {
            let usuariomodel = new UsuarioModel("", nome, email, idade);
            let usuariocriar = await usuariomodel.criar();

            if (usuariocriar) {
                res.status(201).json({
                    ok: true,
                    msg: "Usuário criado com sucesso!"
                });
            } else {
                res.status(404).json({
                    ok: false,
                    msg: "Erro ao criar o usuário!"
                });
            }
        } else {
            res.status(400).json({
                ok: false,
                msg: "Parâmetros inválidos para criar o usuário."
            });
        }
    }

    async listar(req, res) {
        let usuarioModel = new UsuarioModel("", "", "", "")
        let usuarios = await usuarioModel.listar();

        if (usuarios.length > 0) {
            res.status(200).json({
                ok: true,
                data: usuarios
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: "Nenhum usuário encontrado."
            })
        }
    }

    async buscar(req, res) {
        let { id } = req.params;
        if (id) {
            let usuarioModel = new UsuarioModel(id, "", "", "");
            let usuario = await usuarioModel.buscar();

            if (usuario.length > 0) {
                res.status(200).json({
                    ok: true,
                    data: usuario
                })
            } else {
                res.status(400).json({
                    ok: false,
                    msg: "Nenhum usuário encontrado."
                })
            }
        } else {
            res.status(404).json({
                ok: false,
                msg: "ID do usuário é necessário para esta operação."
            })
        }
    }

    async deletar(req, res) {
        let { id } = req.params;
        if (id) {
            let usuarioModel = new UsuarioModel(id, "", "", "");
            let usuario = await usuarioModel.deletar();
            if (usuario) {
                res.status(200).json({
                    ok: true,
                    msg: "Usuário deletado com sucesso!"
                })
            } else {
                res.status(400).json({
                    ok: false,
                    msg: "Erro ao deletar o usuário!"
                })
            }
        } else {
            res.status(404).json({
                ok: false,
                msg: "ID do usuário é necessário para deletar."
            })
        }
    }

    async update(req, res) {
        let { id, nome, email, idade } = req.body;
        if (id && nome && email && idade) {
            let usuarioModel = new UsuarioModel(id, nome, email, idade);
            let usuario = await usuarioModel.update();

            if (usuario) {
                res.status(200).json({
                    ok: true,
                    msg: "Usuário atualizado com sucesso!"
                })
            } else {
                res.status(400).json({
                    ok: false,
                    msg: "Erro ao atualizar o usuário."
                })
            }
        } else {
            res.status(404).json({
                ok: false,
                msg: "Parâmetros inválidos para atualizar o usuário."
            })
        }
    }
}