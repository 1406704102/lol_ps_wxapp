// pages/championRank/index.js
const PJRequest = require('/../../utils/http/request');
const url = require('/../../utils/http/url')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAD5UlEQVR4AeybA7DkShSG82zbts0Jrl14tpHOPJtr27a3tN4trG3bts1/z7k20zMXp6u+yjD565ukNR1DSpiKFClS4r/DRWYQEabCL6aL7rQdH1BYRI+30OO99HgzPV5Bj6cQXfhztsLrbw3EeaHMGfDwLGX5lGhAGYYFXKym7S5iK7GRMq6l7QJ6vxdtf3CCeC25Oi4Nq1wA55DcFAo0hDhEoVEK9hD9SHoc709Hzsjv8Cgdow5lXFOajCT/FDGYM1avjnNDJvjrDrjAcvEZBV/CQXxkGfGtXR3n+5GTxLxJGef6mZF/LJL+R9QfuEr3pfclHWgTH1QX/AMSMWUQ/HRAYZzWjGkOEnXUwVeaCgP4ICGkJ0m7vCQZLRedSPLpUGaM/QnX+iLZDuJ5bjQIhByF5c53eKrIjD/ibm58w5ExvSF9tUySTQ9v086OEwgX3NAWVpVYHl6hz20nEDYUjtgekkol2VJwMiSXA07YHt7NcyIovGO6OFoeMlKWkxkZi134cg0o7OcdlBuo7mWxOa62jPq4/HDccWEVS3LUD7iTBxr8xXLIcR4YWUHE81leTjPucX7AQ0WKJsmj+AvlFrrSiCP8uBwzq9DxAI/0/DmQYHn4u8D5Cv+6cYKpcIy7nfl15f4VQb7LbpdDMtcnpoudIsf/szo6iFuzzw/EiZgQ1NVkvodI0TYBNSej2rhY7+BEiHJxLw+1k0WG9urjIxZdU2RoRqEp189DRIZeyPEYFr1AZGgXvZRFbxMZ2tluhGTOWThu6J84F9gxVx0HRYb2OnqXQQ/WiwztrGfRk0SEZhQmsuieIkN71dHKsFx8LTL0Ynr43Ij08KDI0IyHZw0uWv/1Fg7z34S656MFD11zL6uC/wh51uWZCjNEjO8szrsi08WHIsb3Cf/v813Jz6vuRZB/U6NvVceFBS3TNelDZ0RU2bGDsI3CiqnQXkSV+WzuYRRV+EYY+uAGEVZKFDbHf4cbinfLmIsn6UsHRFyJz+SDfLNSyVb8e4jmVexn27eL4wiCGIzCSmxXZ2dhthvMzAxZy6e5GTW1v+m9KiXwDUMD+Pn1iN5jzjJ5iQUQPzdeYtXGNKnRgfxwbz6yIQE2yLPBZrzGoSWSY4OsxwZZjw0y2C0OLJEaG2Q9Nsh6bJDBntbYN315bJDB1iODrUAGe0DesyGwQX4bG2SwvcSu5QNbjwy2HhlsGTLYXmPHxgc2yHpskMXYAzJNW7QZvk/eNspj65HBBjmLDbIoL7Ex4gXRln0+8ho7IIuatDgAWYVd4iSxni8V2DUuQNadRm5A1p1GHkAWNS3x7DWqfV9ERERERC8dP9+g2phPNQAAAABJRU5ErkJggg==',
    hpRegen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAEqklEQVR4Ae2cA9DsSBDH52zbZuHsy+Tzd7btu+lkn82zbdu2jdLZtm3jf+lXz8p2sjvZ1PavqmuLwS8zPV6j1AlFUQLCV4EDphbtFaza8O8RYc2AsE/ocHzgcEcS71rCN0l8nsTH1uH95PelgHBF8tuzNcZGXf0wm4quAn4uSzgyiff4OaVhHf5J4rYwxqaHHoppSy86JBwYxOiu2TPH2N4Snk+VKQj+WNZhYMdAzFVa0ZZw4qhrEe7Jc60WwuoB4VG5SFEp/yT53bzcokdX1+T37ETa7KZKNq1gztDhgoDwL1/DU1ze3RvzllD0JFX19Wqu29ILSweEV+Si8sfohnTDUose/SK/cEM0xdweYYPA4cskUFgQfmuJsEUpRAcRTprK9f9qibDLZD7Oztbh93QZXkr23yFh17KLBudeFjtWcoSdBPnYV/zZ6hBOUWJqOPxXxU2+S7sOV/PU1JHyIjZGG6cSLuWFCU3x0NoTK00q2mf1imBzieYg/Mg50as8eRp5tuVQTF+86JTU4SG+tA7XW8KgFsIO3JBxvzgkkHU4pRY9mDDCkKYVbQn32RhbjSptKbTEWNkSzkni74z3+oO7nU0l2jq8ZSNslmmuJMKKgcOTGWWfU94cLY87thqAOUwOdjwUM4aES7KU6s4YizaU6NChUodUcVotZ9x4WiBzrm4U0Yx1OLaG6eIUU2MOOg8zWMJTwud4ruFEM2GEo/1JltMWYSnuz0uep8NhWc6Nq6QFd8JTqwhhy7TrbHkoZq1y3uPIHPMOJ5s6YwlnCdPHng27whISDvctWSB6CR4tS57Lr2j5/Mdh3iTLG8ZnBI3ywx5Ee5DtWbI0vfG8ul/ROdKIL8kC0TtLhvylEM1YhyMmU1LOMgXBs4iS6dPGEi2orpZwHQ9GitwjIuhu/u5fdP5G6KiA8CAPi02BWEKXIEd/UzrRo1e8ZzIFYyPsJ0gdH1b79TbkJZqpxejBSNPAo09B1/MJkw1FssXMEs4wihxbwRrCOZ79jJIpbdwoEc09FKPIGL1hB4L4Vdh4K9zgB4QXhaX5YqPISCRfnWGVZ8OJq4TjdTtJhA4HNY1kh6OSgDBenVzu2TbjRPvwJsjLQzLu7egxpb7hYyp7kh7GwIwLw69PcZqgJcbaY1cOhBE6jFDJ4yJx2ZKWiy5PAtllq2RLuMykwQdhLOG1ZpbNe/JyLA5/umkFC5hq4OVx6/C1d9nlL8k/82El6emmjXllIMdNRzZTSeYDTrxvO+uN9+KLNINslpzzXQ82eQgdKv5ll0yyw0CTgi/Zh6pk/7JVsn/Z5ZUcEgbUewYrLrvswGFwEsgcEfobOf5l8zavEkgWlGSV7aEkq2wPklW2B8kq27dklZ1XsiX0M6NR2fLlJ7Fkle1Rssr2L1ll10ByXyOn/LL57IpK9i1bJadjI0T5ZavkwmRbwtBc13ToY6aAyvYnWWVbwqEeJKvsnB+qt5Gjsv1LVtn+Jats/5JVdoReRpHI9i9ZZeeXrIQEUsklmIiyhJ5qUACXSk+SFV7tUMkeNyP6k6y9kWGCQ5NK3v+/U8kez2N7kqxYh2NDAhlFURRFURRFKY7/ARItE1pGGotEAAAAAElFTkSuQmCC',
    mp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAE4UlEQVR4AeydA7D8SBCH92zbts3p7J5t23fTszmbD6Wzbdu2bdu2jd9tn/Je1db+cy/YTNJd9ZX51e6kp7vTqfkUS4WYwTAeIoetahrZRJ2xAjG+NBb4C8Yp6/ZgZDWTYhiHPQzjdxE8EGI8YHbGZGooYcgvNmCcOVBuG9nvGof51dYQY/ldMD4x7haZMfjeNLG2WvufQU1MZyxeaoH44A9i7Kb2YkbDYgFifCTyhgJZHLfuJRhBTXYIYizX4jsRlgjGlfUejKpG20Rgsa6x+LkFUoFx14ohxlazgyVvF6Vv6UEWTyy9EyZRw62QB5hIyQzGy0vtgimqLnlvkZEDry/lME0lJRvGASIhR96WWknVfsk9uUqOzuz3lrGYvhoPPsaeyaUlgPEWMaYqtWRycMllJYcYr5a2GBVYbCnX5BYoCM+vGGKispU5V4/y5OJAjEeW2x1jlEJyPcSihvFDAiFZy76+3oMRvZZMO2Imsvg0gYi8ZJ/mreTldsfEclFIICBv2Qd52Rkhxv1+SI6QwpZvt75TfJMsSIl2aYu5/ZBssUML+ApZvLm0wwRFHwlY0lj80gKey769sJmIJP/E+NBzyQNl9xe1UHRdCQRHMH4nByra9Tosj+QIYryzssV4RRkNmIssfiyZ5AjGpYXIlw3judJKjn7Zm/nfJfEAKSPI5FS3UrkZoyOj/BDj9G5lGbdUQnLEH0EIk/cDcKNKSY54fruTMVIukmXUSpqcFRUNYmyfV7dk52pKjnLrFUOMkqnkVXswejTpWWEYTT9GBfxP9z7IbFpVmpjE+ExF/9ckCLNK57ZWwQNgPJeNaIsHVfBgGg6LpCq54TCHim0D45S0axpHqNi2fJPaAA6A4QzjE5XaHnJYLxXR0hVWoR0vMCemkzs77KhCO4p+Ia207goV2hmZykp8Pg/7kqLUGeskEt1zDiZWkTFw6E0kuv90zKIic3gg9pyJRVVkLNGXJxJ94OlYUUXG4r5kv+jTYrWsFMbLSUVvoCJj8VKyo+NUrK4SY53RjyYVvayKjCX6jkSiDzgNS6jIeItYEone/1RMpyJj4HB4sofhJRg51ouY2j/crpY0hv0Km9KwCNKo3l2lMjvyRyovFxFjJ5XZAcbTqU30q9COwzRH5tAzVALGqmkOz5ykUtvA+DrV0TBiLK5ic9qKYCxeU7mDIQfKfked8hKA4bJ4BXnsaPW7Qg6bZzkf3aeSAbJ4M9OX8uUGRBZfaUqHbfN4ibNZ9SJ/Tw+Gz1y0bBsniycqmjf/HjAWquUVJsTCZPFbBc/m4/JfHeGwb8WOjGfW3QWj5S4awHBkcVNFJH9Xb2LW7q73sXiz7PXmusMGtW7H0g4zl7m6F1jsWpztYE0sSIxvSyj5kEKuYivTFZ0Yh2VRy0ivG8N43/czWb42Vyt6yNchpI/m6YXkh7rFJjVfQroOvu0nJcaL8o/09cMJGxqLLzyYNDrD+83okmv/8/HHP4q4uicafilJNJoyMIn7CiL4Y2Lsltt+pC7l3HVjcWu3PnhDjJ1yqFkUKxWUXJUsPshY8C8yVkuMtSr91WWpbwcOy/4j/Yk0plf/Wq/MuIAYWyefiyvxR32DJlYMGLv8OejCnf1A+hoQPwZNo0HHwb8C+S+A+DYQnwbylwPpBlArB0hrDkZ/AQAJDG3xskFBGAAAAABJRU5ErkJggg==',
    mpRegen: 'data:image/png;base64,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',
    attackDamage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAEoElEQVR4Ae2dA5AlSRCG+2zbts3K7ne2bd9V9nvrs5aBs23btm3btn3332ZER8TYVd1Vk39E7o5n+pvqnEp1JTEpzbE5Ma4li/eNxbeGcQ8xDtp6OCZMVL3XhhbTEONKY4G2jCxerjWwlJLqhdbMMZ2xeEGAdmTE+Gj9BqZUYg4hN1nZZyo1x5AL+wnAOErPJeTCaAAWUIKOIYtljKWVolvIYn+63+opZBDjLiXpGLJh/ObYPytksZSxt9J0DTnHAKWpkBWyQlbICrn/QLZoJBVSNhwT60p2rH3OxASGcbvjRJa6i9Ti7CIinUPdhSvIjMHFz4dajjV1JTsQMQYai/+a/IxWIff9Sh7ZRmXneHUXfaThwzEuWZzSTgntRl3JfaBsEOY2Fvd3kJ59MMqVnDUwu68Ef2qxj9QiOykKPxcd5NpALEQWnxmLN1z+tV9rIOYkizu6WH1/Kyp30QRy04T/ZRlj5qSPRA0sYxgXG4u/ulHZ+TxmyE3tV+npqOVYLOmBAIyTMjZu3w93CvqXeNwF4/MulrTuoRzbZIMwdWc/f2qxtfyCDOODXtYq/44fcvt+8x9iPFu4gTHEONTkGEGMc+TtTQKOvrDvonEXVTZivKeQPZhs7xSynxV9n0L2YYzrFbIHSxnnhxjxIThjHKeQ/fjofRWyB8saWFkhuzbGv+sMw2QK2T3oNxWyH/98pUL2YGmOQxSyB6McGyhk927jbxkiVcjuk0kPKWRf/lkhu7c1LZZUyJ5y0ArZ/W4jV8juV/Pv8gwRhewe9KVJS0mvgu9qdcTWfj+0sXjHNWQRWVwTPeSi4t3mKIW8wzVkUcaYX+axo4edY1CbAKQLx1d/MjGGRQ76w/UbmKi9i//IB2TR1ldhPGI8HS1oxm5JezKMT3122md1LB8p6Fel67+j2/lz3+MMxuLu2EBnFpt1dtFf+p4ZSXOsHdm++fGubLu+LmMwR3IBkfjlf2t1rNaV2/hb35BFqcXukeybj+7qyvrBN2RRNhTTy2oIHPJLTbZzna7on8qa4yPGUwFD/kPyzd252F/KGpY0jLMCBj2suxf7WxmQmw6mB2eMB4o9c9clt0BZY7+UY48AIX/ao8dCSEm8rNnqzGKnwCD/2OMHfst0UhmQiy3ekIBA/9WrSVzDqCclyeQ4KRDI/xFjxyRUGcaLgYxGHBAs5PUbmEFWSgDbuGOSkEWMbSvvLiwODBpy0ydoVdT+Knxy2Np4OCYlxveV3cLJ7iIGyZRSVYORqA7GIYuXqxhWFxFfHMrqyCoG+U+TY/8muYtoVvNtVconF6nOuESMLapSfpL9cZG0j0syy0EWn1QA8hMZY/UkVhHj5JLdxGty3mESs2RfWmJ98EMpBEuXVNyQB2IhY/FdCb0W70sFp/DDcWvdwZiWGG/7LJgai8szi7X6zXF6RZj9oCfAzxtGvek4Q386A/Yxl0EGMe4zFgf327Nk165j1j4OsSVn/S5Z3EiM0Wkd68vdkvR3rTEYsxmLDeVWlqCgOD76SWlrlaZ3YnwjU0uyCym6pD6UCM0wHibGLTJoM9aOJ8aetRwrFQ8VUalUldL/jdtQbwHVCyIAAAAASUVORK5CYII=',
    attackSpeed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAE0ElEQVR4Ae2dA7D0SBDH851t21c4WzPJ+2yzdMZ0ds/m5+LZtm3btm3b/N921dRV7h12Ny/Z7WT7X/Uv16vJbyed7kG/wBIuNw4oskOHQwPhKjxoS5gcsBS0Qk6AVsgKOgVkBZ0fZAWtkBOgFbKCbgKyglbILLM7lo4Iq0l0X4dVBCJTRZMxW1cV64YO4yLCejudjNmVSoaaPBmzWMJexuH7v4Uewg8hYd9xl2BWpdRDDdgDixiH++rE+vsGVTFnoEoP2To80dAKX4yZSixnyGzr8Fvf3bBC+7KOGCNq3qed7r0Hls0NcsL8kezYPJrz5Pwhe8eYIh90wSH7Gb2TfNAFh8yOKthIPuiCQ7aEOwD0kg+62JC/sxWsLH9RqciQHX60hP4iVu8UshTQClk+aIXsxatbhnBlHuYVtXZADmP0k8K3/96YNxCgUs9kXluxhIsVcs4z2Tg8ZR0+KD5koeFi3GTMYRyu/asiJcynMzljMVTjcGu3xawNFHL2z/Twv2ReExRyRuIFK+Pw0r+Ol1Dh9O5MQ/gkrW2MWDrkQVUsnhdg3mm3DtMs4df/GfMBvmApbzFiKxhuCT+ZGGdEe2GxLCF3OWzImUVD+5UMusyQjcMvib/xeUjYkc9/pIULoFdYwaDkB6+uYxzjQXcE5OT43+XXuU+MRRsuPvbDgibGDsbh+WbHzuHZgy435Dp/9/Ka944IW43bA3MnwUYVRJYw3RAe4l30dONPgC4r5BT+wxB+YGe6sOZwpAddKsg/CzwRe5gHrZBzdYzd64OOMUUh99CEbTxohZynI4eRQdduWNMStuhuLimlr8IlP3ySHVZhmmGpMzmlOV9XyDnbOrynkFuT2l2nkFvjGQq5BbYxxivk1nwI11DIOTvVDrhCTrlqp5CFxWet+FL7+0FVLCAYcvFnsn/usxRya8KGVcj5z+ZXFHJryu79xUH2nQneKA1kh9+4B4okyN1nNEric0QfnTUOF5YA8s/R7lhJJOTk+ThL+Kzgsfno/35tHW6XcgjcEg4qMORv+++NJf7vlX1NAmTWEIeFecCSgabeyOYvvqTrDIZwRAFn80fD98X89R7sLSmQWXxnu4CrdMMaiYvvSruYU6i8mnBKo6/q+5Igs3hBpiCgX2v4wqYlfCgJsh/T9kWoAMMYmzdTKHwsCTKLzyoXIC5PbfY1/VQSZA96PeGz+TJeo2m29P2iCcg6own3RpMxV5oPz1eSILNCwiSh+fILXFSlXcz5RhJk/+MfJ3Amv9+jTpCW8J0kyH5MLwqD/Ekfh3V6WvL+IAlyvwqWkZYrc9PwLGbPT1Igs2yM7QTF5Ecyu95sCb9Kgezj88NSjttm2qaHY7QUyKaKTYRAPjHzLuqRQ99AiAzh3DYXIp+GMUYFZRb3kOY9t3aGij67Ycmg7DKES9sE+Luadw46QVGMoW2A/Af/uL2rWLUjIPu2ZW+3GPKt/h5l58gSzmtlXtwVo0/QaTKEQ1oA91du32kchgSdKG5RxnEyR8Avmhj7+EyiM8VXDnJK5V6zhONr3iLodBmHXQzh9wyg/mIdnjWECzg9S7SWV3GPOFPBGH6ljcMJ1uEG387sNb9J/A1venJuy+u/vNBuHR6s+SbuWsttzXhTwFawdtH+s9uf+dZzrBttIC4AAAAASUVORK5CYII=',
    armor: 'data:image/png;base64,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',
    spellBlock: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAACClBMVEUAAABVqv9Daf8/af8/a/8/av89av89av89af89af89af8+af+AgP9Abf8+af8+av89av89af9AbP89av89av89a/9Aav8/av8+af89a/9GdP9Jbf8+af89af8/av9NgP89av9Aav8+av89av89af9Abf89a/8+bP9Jbf89a/8+av9Da/8+af8+av9Hcf9Eb/8+av8+av8+av8+av9Abv8+av8+av9Ac/8/a/8+af8+af89af9AcP8+bP89av9Eaf8+av89af8+bP8+av9Aav89af8+av8+av9VgP8+af9Dbf9Ba/8+av8+af89af8/a/8+av8+av8+av8+av8+bv8+af8+av8+af8+af////8+a/9Odv89af8+av9BbP8+a/8/a/8/a/89a/89af9Aaf9Bbf8+af9AgP9Laf89av8+av8+av8/a/9mmf8+af9Jbf8+af9Ca/8/af8+av8+av89af89a/89af89av8+af89a/9Db/8+av89av89af8+av9Baf89a/8+af9Aav89av8+av89af89af9Aav8+af8+af8+av89af8+av89af8+af9Ccf8+bf89af8+av8+av8/af9Aa/8/a/8+av8+av9GdP9Baf8+av8/bP8/av89af8/av8+a/8+av8+av9FbP89av89af8+af8+av8+av8+av8/bf89af9Ba/9TQAumAAAArnRSTlMAAy5Vep/D1OHt+cICOHe18f80juWNDHHacAsVg+6CCvZUHby7HE9OB5KRE8fGEh7X79vPLN5jFDmg5NAgIdEi5/otoRjd+5MGvSorvpTyXV7zW80lzqSltgF8DemYO1ZuhoFoUC+4BBGv9J1RBdMO8B9h0jqWZMzA/DIX1v3Vrj919zDqV6eFPOvJy9gpot8bMf5Gf3JMaYSAFjP4SU31akroZxqjv5m5b4c93DfZ0LDrAAAFE0lEQVR4AaTBwwEDUQAFwLe2bSNO/9XlHu3HDAgIoiQrqqYbpmnomqXIkiiAn+24nh988D3XscEjjOLgpzgJwSjN8uBAXpSgV9VNQMBoK9Dp6j4g1LcdKAx6QEEfQGqcAkrzAiKrEVAzNhzbTwGT844Dl2vA6HbHX49n8KrNHvzjeOIwjj+x8dTGpWZsm7UOtW3btm23f+OP2Zvv7OymE71fbJN8XnNzO7Pyk5dfkJZWkJ9HP7nz0YPCYfRSlFCcUYJuJaXFZUX0Ul4IX7FeQ6rIrIShKrOapvG+7ZpautWV1fuOo6HOHPd8eGpsokvzzKnoQaCl2ZjvefDQOocube34g45O4ziZAVMXdQsWwsKixdTNgmEJdUuXwcqy5dQZ6zKwgJoVrbA0YyU1KVOhW0XN8CCsBYdSMwWaRdSE0CshaiZDCEcorYa3GWvWrlu/YeOmzUHo9HEnT4SygdKWrfCwrXj7Dnar3blrN4SgPt8TxGLZQWHPXphGhPZR07QkHcqM5RQmjfX+PAv2w3QgQsPBQ1CWLfYc9t5sCutg2H2YXlKP+B0IKc41xEgKR2PgVnKMPmaKX+6kMBr/CTZROX4CbidP0ddMsZ80UxmF/xyi0GVVVsSctFAYYvzX6UqjfIY9ST0ER6BOLmcAiIlQOWtZVg6mw9FAZVg6gAwK52xnQ1kCRyyFDADxVCqsx6w0qXVZTSUTQBuV8/ZlZRccmVSygK0XqFy0nw1lpzrPU8lORzuVS0H7slIbhKOISiwuU7liX5Y2w1FGJQ5XqRyxn2dpExzFVOKxgso1+7K0EY5SKgnarjLfvixtgKOEShpyGXU8xr4srUeUuGhMwnVxTuv1N2js8PmytoBRN/pW5lpEFTAqBWLF3LSfDc0aRKWJPRHHxSZmP2ZpxwxEJcr0Dkbdwr/G3lbu0MJ2+EzIMEbdhcvUSbRQDJ+vUXz8fXBpoIV92+Bz8CVSuQfN/Qe0EAJ8loyczofQtNFCZASUDG2hP6LyGNIT2jgAQd+eluiburL1FC0chqRvqoVUiiA8pYVjuyHpp4L0bCr3vS+5fZ0pgVRJJTsGyKHyDFFXbconoZinXTynkgtHYJJF+QV0Fa6LhZdUXs1Dtzu9HzPq3Zc4wWGq/BrdTjzofRll7gszrDbL6OxDeWodlaHyIliW39DD2zKzLM00L4Jxxl3emkvD6YR7t3sst3tcumOkq4x3NORsBm4bZd8dZyT+t22BXg5fMib2PaDSnuWFFMaPQLf1WhnrqfvwMQYq7V1etoDCODhKUmQ5cIHSpGdhQKW9y61LfW5J8QnCZwqny6bCcdu3HFxBc9AmbbW03Ydy26+M4f63/9IXRp16Aum2Kts/tBCm0xF5GgPNbe/y1q/U5MCkrZZJV8Nwue1Z3vuNmpQATGK1PLgTgOG2V3n/Huqmwdve/1dL5wl4KDHLMd8XUDcTPn6QZO4bWDpxlC5zZsDb/AvkpXdbYaey6zhdcmfDxwpe+LEXmnnwce7saevHtcDL45/nQ/f+Ve6z+3AL3j9f0auHzNjwEkaZJIt2Pn7oXA/GzP955MoleqmNhb3Xrxi17+6tgzdvJB+nn181vSvbm9M4WOWu1kEqL1iCQSqvCgxSObIIvfEphZZ2bAijd0rWL6CF7KGN6L1tI8/wD5pG7kUfHVo9rIcpbjkURD8EXz7KyTazF9rifw/Iu/TCJY/uJJ4atqP5Qvb13LYVVy+322T/Bqg980l5jgfKAAAAAElFTkSuQmCC',
    attackRange: 'data:image/png;base64,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',
    moveSpeed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADMklEQVR4Ae3dA6xcTRQH8P1s+6sV1PbMsrYZp5i5W9tug7pB3capbTOobds2/s2N68fT82bPP5nw8ZfJGd67AW2wL6M3ZbG+Ymf8HUhCghY1lMWsBv3xdYAyygAZuWmL6+E2KJRkZIMnygDaYAEpdqIhv/H9C8mwExSZHjtBkemxEx2ZDFuQibAFmQhbkImwBZkIW1t059xCbZGfADkp2JI3kQWbHlmw6ZEFmx5ZsOmRybBD/fHtp24tJ+AremRibEfmyfyxBZkIW5CJsAWZCFuQibAFmQhbkImwBZkIW5CJsAWZCDvsIZpeLdQe2R1AdmMjihiZvllciHjIJsjpjKzbIo8gC7IgpzSCHGwDlZqWxOsA0pNTO0+OGhRMgrGUCyJkqcmy4iMa+IiQZXZBhCxTOCJkmScTIctihAhZVnxEyLKsFmSivYsqbfDzu5p/J06QZYNIkAVZkAVZkN9IyKK8IBOkUgf8rg0uCjJBtIeqgkwUZTFRkAlSsyt+0ganBJkgYYOgMngpyARRHkYIMkH8/RBtcVCQKbDjKK4tngkyQbRFf0EmiP+IsTLYzvyecqeACwl7yKctHrOFNritLbI4ge33GuYlZBWAzzI8dP/++FwbbGReq+MBFxIzyKkt7jHGfkAwKNIkaNCS+cC4tcFMfOEEtrJYxrxe93ACukIc/yuDm4yhn/jXjl1591ET5r16tzMvo1IWszhjBz0MdQI66uEPbXGZ8ULmeagNSrv0+jSwbRZHavTH966sGqcwn/KNcwLav8+nLE4zxn4Z9hB1pYSEOR9/aYuzsW74xZUSMpp1CTGY7gR0gw74Thkc5oytPNRyAlu1QUl/WsW4hDzTFvfebMrijjI4rg02+j1fe2joX71gja0NBjlyCeeJP6OKdEAmtsdf2mKXQzeeHmqLXiwPFvw3I1AffxGUnTkVO+MHjlO+rg5emtzkb1axO/5SBpudw/YwNcAtkTbIpS3uu4at42jKr4R4MM5BG5yq0gbfcFw1riAAkFP3UBtk1ha3HJuFbOF5adKguWM9+oX/Cc9cN57mONar63Ldu/5LGVxxBTpo0Ibz0wS1HOrRw14Bh6Tzq/S3yMsAAAAASUVORK5CYII=',
    // --------------------------------------
    WWidth: app.globalData.wWidth,
    spellKey:0,
    LV: 1,
    basicInfo: {},
    patchHistory: [],
    versionDescription: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id);
    let that = this;
    wx.getStorage({
      key: 'versionData', success(res) {
        that.setData({
          versionDescription: res.data[0].description,
        })
      }
    })
    if (options.canBack) {
      that.setData({
        canBack: options.canBack
      })
    }
    PJRequest.getAction({
      url: `${url.heroBasic}/${options.id}.js`,
    }).then(res => {
      that.setData({
        skins: res.data.skins,
        hero: res.data.hero,
        spells: res.data.spells,
      })
    })
    // https://lol.ps/api/champ/266/basic-info.json
    PJRequest.getAction({
      url:`${url.champ}/${options.id}/basic-info.json`
    }).then(res=>{
      let basicInfo = res.data.data;
      basicInfo.passiveDescCn = basicInfo.passiveDescCn.replace(/<br>/g, '\n');
      basicInfo.qDescCn = basicInfo.qDescCn.replace(/<br>/g, '\n');
      basicInfo.wDescCn = basicInfo.wDescCn.replace(/<br>/g, '\n');
      basicInfo.eDescCn = basicInfo.eDescCn.replace(/<br>/g, '\n');
      basicInfo.rDescCn = basicInfo.rDescCn.replace(/<br>/g, '\n');
      this.setData({
        basicInfo: basicInfo,
      })
    })
    // https://lol.ps/api/champ/164/patch-history.json 英雄改动信息

    PJRequest.getAction({
      url:`${url.champ}/${options.id}/patch-history.json`
    }).then(res=>{
      let patchHistory = res.data.data;
      console.log(patchHistory)
      this.setData({
        patchHistory: patchHistory,
      })
    })
  },
  spell(e) {
    this.setData({
      spellKey: e.currentTarget.dataset.key,
      spell:e.currentTarget.dataset.spell
    })
  },
  LVMove(e) {
    let clientX = e.changedTouches[0].clientX;
    let a = this.data.WWidth / 750;
    console.log(a)
    let data1 = e.changedTouches[0].clientX-(a*70);
    console.log(data1)

    let number = Math.ceil(data1 / (this.data.WWidth-(a*70*2)) * 18);
    if (19 > number && number > 0) {
      this.setData({
        LV: Math.ceil(number)
      });
    }
  },
  LV1() {
    this.setData({
      LV: 1
    });
  },
  LV18() {
    this.setData({
      LV: 18
    });
  },
  LVEnd(e) {
    let clientX = e.changedTouches[0].clientX;
    let data1 = e.changedTouches[0].clientX-(a*70);
    let a = this.data.WWidth / 750;
    let number = Math.ceil(data1 / (this.data.WWidth-(a*70*2)) * 18);
    if (19 > number && number > 0) {
      this.setData({
        LV: Math.ceil(number)
      });
    }
  },
  toDetail() {
    let that = this;
    if (this.data.canBack === '1') {
      wx.navigateBack();
    } else {
      let heroId = that.data.hero.heroId;
      wx.showLoading();
      PJRequest.getAction({
        url: `${url.champ}/${heroId}/arguments.json `
      }).then(res => {
        console.log(res);
        let data = res.data.data;
        // championId: 1
        // laneId: 2
        // regionId: 0
        // tierId: 2
        // versionId: 89

        wx.navigateTo({
          url: `/pages/championRankDetail/index?id=${heroId}&canBack=1&region=${data.regionId}&tier=${data.tierId}&version=${data.versionId}&lane=${data.laneId}&name=${that.data.hero.name}`
        });
        wx.hideLoading()

      }).catch(r => {
        wx.hideLoading()
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
