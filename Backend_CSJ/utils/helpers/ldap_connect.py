import ldap


URI = 'ldap://172.28.32.4'


def connect_ldap(username, password):
    conn = ldap.initialize(URI)
    conn.protocol_version = 3
    conn.set_option(ldap.OPT_REFERRALS, 0)
    try:
        result = conn.simple_bind_s(username, password)
        return result, None
    except Exception as ex:
        print(ex)
        return None, {'ex': ex}
