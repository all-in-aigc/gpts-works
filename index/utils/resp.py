def resp_err(msg: str):
    return resp_json(-1, msg)


def resp_ok(msg: str):
    return resp_json(0, msg)


def resp_data(data):
    return resp_json(0, "ok", data)


def resp_json(code: int, msg: str, data=None):
    json = dict(code=code, message=msg)
    if data is not None:
        json["data"] = data

    return json
