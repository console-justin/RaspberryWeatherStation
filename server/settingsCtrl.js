const fs = require("fs");
const path = require("path");

const SETTINGS_FILE = "../settings.json";
const FILE_PATH = path.join(`${__dirname}/${SETTINGS_FILE}`);
const ENCODING = "utf8";

function readSettingsFile({ successCb, errorCb }) {
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) {
      errorCb(err);
    } else {
      successCb(JSON.parse(data));
    }
  });
}

function createSettingsFile(req, res) {
  const contents = req.body || {};

  if (fs.existsSync(FILE_PATH)) {
    return res.status(409).json("settings file already exists").end();
  } else {
    fs.writeFile(FILE_PATH, JSON.stringify(contents), ENCODING, (err) => {
      if (err) {
        return res.status(500).json(err).end();
      } else {
        return res.status(201).json(contents).end();
      }
    });
  }
}

function getSettings(req, res) {
  if (!fs.existsSync(FILE_PATH)) {
    return res.status(404).json("settings.json not found!").end();
  }

  readSettingsFile({
    successCb: (data) => {
      return res.status(200).json(data).end();
    },
    errorCb: (err) => {
      return res.status(500).end();
    },
  });
}

function setSetting(req, res) {
  const { key, val } = req.body;
  if (!key || !val) {
    return res.status(400).json("You must supply a key and val").end();
  }

  const writeContents = (newSettings, newFile) => {
    fs.writeFile(FILE_PATH, JSON.stringify(newSettings), ENCODING, (err) => {
      if (err) {
        return res.status(500).json(err).end();
      } else {
        return res
          .status(newFile ? 201 : 200)
          .json(newSettings)
          .end();
      }
    });
  };

  const readSuccess = (currentSettings) => {
    const newSettings = {
      ...currentSettings,
      [key]: val,
    };
    writeContents(newSettings);
  };

  const readError = (err) => {
    return res.status(500).json(err).end();
  };

  if (!fs.existsSync(FILE_PATH)) {
    writeContents({ [key]: val }, true);
  } else {
    readSettingsFile({
      successCb: readSuccess,
      errorCb: readError,
    });
  }
}

function replaceSettings(req, res) {
  const { body } = req;
  if (!body) {
    return res.status(400).json("You must provide settings contents").end();
  }
  const fileExists = fs.existsSync(FILE_PATH);

  fs.writeFile(FILE_PATH, JSON.stringify(body), ENCODING, (err) => {
    if (err) {
      return res.status(500).json(err).end();
    } else {
      return res
        .status(fileExists ? 200 : 201)
        .json(body)
        .end();
    }
  });
}

function deleteSetting(req, res) {
  const { key } = req.query;
  if (!key) {
    return res.status(400).json("You must supply a key to delete").end();
  }

  const readSuccess = (currentSettings) => {
    if (!Object.prototype.hasOwnProperty.call(currentSettings, key)) {
      return res.status(404).end();
    }

    delete currentSettings[key];

    fs.writeFile(
      FILE_PATH,
      JSON.stringify(currentSettings),
      ENCODING,
      (err) => {
        if (err) {
          return res.status(500).json(err).end();
        } else {
          return res.status(200).json(currentSettings).end();
        }
      }
    );
  };

  const readError = (err) => {
    return res.status(500).json(err).end();
  };

  readSettingsFile({
    successCb: readSuccess,
    errorCb: readError,
  });
}

module.exports = {
  getSettings,
  setSetting,
  deleteSetting,
  createSettingsFile,
  replaceSettings,
};
