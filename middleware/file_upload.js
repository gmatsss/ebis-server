const Complain = require("../models/Lupon");

exports.file_upload = async (req, res, next) => {
  const param = req.fromthis;
  try {
    const data = await Complain.findOne({ _id: param });
    if (!data) throw createError(403, `Complain not found!`);
    let filehold = req.files.file; // library express file upload //complainant
    let filehold2 = req.files.file2; // library express file upload //respondent

    if (filehold) {
      filehold.mv(`../client/public/img/` + filehold.name); // to get the file in fetch by formdata and save in path/folder
      const imageofcomp = filehold.name;
      data.imageofcomp = imageofcomp;
      await data.save();
    }
    if (filehold2) {
      filehold2.mv(`../client/public/img/` + filehold2.name);
      const imageofresp = filehold2.name;
      data.imageofresp = imageofresp;
      await data.save();
    }

    res.send({ success: `Successfully Created`, id: param });
  } catch (e) {
    res.send({ error: e.message });
  }
};
